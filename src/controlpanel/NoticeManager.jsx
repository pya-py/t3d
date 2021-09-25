import { Fragment, useState, useEffect } from "react";
import { Form, Card, Col, Row, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import noticeServices from "../services/noticeServices";
import Configs from "../services/configs";
import "./controlpanel.css";
import LoadingBar from "../common/LoadingBar";

const NoticeManager = () => {
    const player = useSelector((state) => state.player);
    const [isAllowed, setAllowed] = useState(undefined);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [notices, setNotices] = useState([]);
    const [selectedNoticeID, setSelectedNoticeID] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetStates = () => {
        setTitle("");
        setText("");
        setStartDate(null);
        setEndDate(null);
        setSelectedNoticeID(null);
        setUpdateTrigger(!updateTrigger); // updateTrigger: true <===> false -> chane -> useEffects calls
    };
    useEffect(() => {
        console.log("notice loaded");
        //use another simpler preloader
        //load all notices in left side for selecting: load all and push them in notices state
        (async () => {
            setLoading(true);
            const { status, data } = await noticeServices.getAdvancedNotics();
            if (status === Configs.Status.Successful) return data.notices;
            return [];
        })()
            .then((all) => {
                if (all.length) setNotices(all.reverse());
                else
                    setNotices([
                        { title: "پیام", text: "اطلاعیه جدیدی وجود ندارد" },
                    ]);
                setLoading(false);
            })
            .catch((err) => {
                setNotices([
                    {
                        title: "خطا",
                        text: "...مشکلی حین بارگذاری اطلاعیه ها پیش آمد. دوباره امتحان کنید",
                    },
                ]);
                setLoading(false);
            });
    }, [updateTrigger]);
    //***** in server implemented a middleware for this, is this needed? */
    if (player && isAllowed === undefined) {
        //in admin tools pages: admin status is checked directly dor completely making sure that user is admin and he/her is trusted directly from server
        (async () => {
            try {
                const { data, status } = await userServices.isAdministrator(
                    player.userID
                );
                if (status === Configs.Status.Successful) return data.answer;
                return false;
            } catch (err) {
                //CHECK THIS PART
                return false;
            }
        })()
            .then((answer) => {
                setAllowed(answer);
            })
            .catch((err) => {
                if (!Configs.Status.isErrorExpected(err))
                    toast.error(
                        "مشکلی در تعیین سطح دسترسی شما بوجود آمد. لطفا مجددا تلاش کنید.",
                        { position: "top-left", closeOnClick: true }
                    );
            });
    }

    // show proper message for simple users
    if (!player || isAllowed === false) {
        //in first render a wronge message will be shown! find a fix
        //2nd condition must be exactly the same
        toast.warn("متاسفانه شما مجوز دسترسی به این صفحه را ندارید.", {
            position: "top-left",
            closeOnClick: true,
        });
        return null;
    }

    //runs when create notice button clicks
    const createNewNotice = async () => {
        //add patern and stuff to states and inputs
        try {
            setLoading(true);
            const { status } = await noticeServices.createNotice({
                title,
                text,
                startDate,
                endDate,
            });
            //*********** */
            //COMPLETELY CHECK NOTICE IN CLIENT AND SERVER
            if (status === Configs.Status.CreatedSuccessfully) {
                toast.success(`اطلاعیه ی ${title} با مورفقیت ساخته شد`, {
                    position: "top-right",
                    closeOnClick: true,
                });
                resetStates();
            }
        } catch (err) {
            if (!Configs.Status.isErrorExpected(err))
                toast.error(
                    "خطایی در ذخیره اطلاعیه بوجود امد ... لطفا دوباره تلاش کنید",
                    { position: "top-left", closeOnClick: true }
                );
        }
        setLoading(false);
    };

    const selecteNotice = (notice) => {
        // console.log(notice);
        setSelectedNoticeID(notice._id);
        setTitle(notice.title);
        setText(notice.text);
        setStartDate(notice.startDate);
        setEndDate(notice.endDate);
    };

    const cancelEditing = () => {
        resetStates();
    };

    const saveChanges = async () => {
        //add patern and stuff to states and inputs
        if (!selectedNoticeID) return;
        setLoading(true);
        try {
            const { status } = await noticeServices.editNotice(
                selectedNoticeID,
                { title, text, startDate, endDate }
            );
            if (status === Configs.Status.Successful) {
                toast.success(`اطلاعیه ی ${title} با مورفقیت ویرایش شد`, {
                    position: "top-right",
                    closeOnClick: true,
                });
                resetStates();
            }
        } catch (err) {
            if (!Configs.Status.isErrorExpected(err))
                toast.error(
                    "خطایی در ذخیره تغییرات بوجود امد ... لطفا دوباره تلاش کنید",
                    { position: "top-left", closeOnClick: true }
                );
        }
        setLoading(false);
    };
    // if admin status is checked directly by server then start rendering the page
    //consists two part" right part => used for creating and editing notices
    //left part lists all notices and allows admin to select one => after selecting the notice will be ready to be edited on right side

    //edit all heights in control panel
    //add patern and stuff to states and inputs
    return (
        <Fragment>
            {player && isAllowed && (
                <Row style={{ height: "100%" }}>
                    <LoadingBar loading={loading} />
                    <Col xs={5}>
                        <Card
                            style={{ height: "850px" }}
                            border="success"
                            bg="transparent"
                            className="mx-auto noticeManagerCard">
                            <Card.Header className="text-center">
                                اطلاعیه جدید
                            </Card.Header>
                            <Card.Body className="text-right">
                                <Form.Label className="my-1 mx-auto">
                                    عنوان اطلاعیه
                                </Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="my-1 mx-auto"
                                    type="text"
                                    placeholder="عنوان"
                                    required="requires"
                                />
                                <hr />
                                <Form.Label className="my-1 mx-auto">
                                    توضیحات
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="my-1 mx-auto h-25"
                                    placeholder="متن کامل اطلاعیه را وارد کنید"
                                    value={text}
                                    required="requires"
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <hr />
                                <Form.Label className="my-1 mx-2">
                                    تاریخ شروع نمایش
                                </Form.Label>

                                <DatePicker
                                    className="my-1 mx-auto w-100"
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    value={startDate}
                                    onChange={setStartDate}
                                    required="requires"
                                />
                                <hr />
                                <Form.Label className="my-1 mx-2">
                                    تاریخ پایان نمایش
                                </Form.Label>

                                <DatePicker
                                    className="my-1 mx-auto"
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    value={endDate}
                                    onChange={setEndDate}
                                    required="requires"
                                />
                                <hr />
                            </Card.Body>
                            <Card.Footer>
                                {!selectedNoticeID ? (
                                    <Button
                                        block
                                        variant="success"
                                        onClick={createNewNotice}>
                                        <i
                                            className="fa fa-floppy-o px-3"
                                            aria-hidden="true"></i>
                                        ایجاد اطلاعیه
                                    </Button>
                                ) : (
                                    <Row>
                                        <Col>
                                            <Button
                                                block
                                                variant="outline-primary"
                                                onClick={saveChanges}>
                                                <i
                                                    className="fa fa-floppy-o px-3"
                                                    aria-hidden="true"></i>
                                                ذخیره تغییرات
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                block
                                                variant="outline-warning text-secondary"
                                                onClick={cancelEditing}>
                                                <i
                                                    className="fa fa-floppy-o px-3"
                                                    aria-hidden="true"></i>
                                                لغو ویرایش
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs={7}>
                        <Card
                            border="info"
                            bg="transparent"
                            className="mx-auto noticeManagerCard">
                            <Card.Header className="text-center">
                                اطلاعیه های قبلی
                            </Card.Header>
                            <Card.Body className="text-right">
                                {notices.map((notice) => {
                                    return (
                                        <Fragment>
                                            <Alert variant="secondary">
                                                <i
                                                    className="fa fa-info-circle px-3"
                                                    aria-hidden="true"></i>
                                                <span
                                                    style={{
                                                        color: "red",
                                                        fontSize: "18px",
                                                    }}>
                                                    {notice.title}
                                                </span>
                                                : {notice.text}
                                                <i
                                                    className="iconEditNotice fa fa-pencil-square-o px-3"
                                                    aria-hidden="true"
                                                    onClick={() =>
                                                        selecteNotice(notice)
                                                    }></i>
                                            </Alert>
                                            <hr />
                                        </Fragment>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Fragment>
    );
};

export default NoticeManager;
