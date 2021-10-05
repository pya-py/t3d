import { Fragment, useState, useEffect } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import LoadingBar from "../commons/LoadingBar";
import "./profile.css";
import userServices from "../services/http/userServices";
import Configs from "../services/configs";
import { useDispatch } from "react-redux";
import { TriggerRecordUpdate } from "../dashboard/actions";
import { OK, Sorry } from "../tools/msgbox";

const MODES = { READ_ONLY: 0, EDIT: 1, CHANGE_PASS: 2 };
const AccountCredentials = () => {
    //states

    const [fullname, setFullname] = useState("");
    const [studentID, setStudentID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [pageMode, setPageMode] = useState(MODES.READ_ONLY); //  0 => read only, 1 => edit mode, 2 => change password
    const [pageUpdateTrigger, triggerPageUpdate] = useState(false); // true <=> false -> triggers page , ==> see useEffect
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const dispatch = useDispatch();
    //on component mount download user credentials

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { status, data } = await userServices.getMyCredentials();
                if (status === Configs.Status.Successful) {
                    const { me } = data;
                    setFullname(me.fullname);
                    setStudentID(me.studentID);
                    setEmail(me.email);
                }
            } catch (err) {
                if (!Configs.Status.isErrorExpected(err))
                    Error(
                        "حین دریافت اطلاعات کاربر ایرادی پیش آمد. ... لطفا دوباره تلاش کنید."
                    );
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [pageUpdateTrigger]);

    const reloadPage = () => {
        setLoading(false);
        setPageMode(MODES.READ_ONLY);
        triggerPageUpdate(!pageUpdateTrigger);
    };
    const saveChanges = async () => {
        //add patern and stuff to states and inputs
        // check all inputs plz
        setLoading(true);
        try {
            const { status } = await userServices.editMyCredentials({
                studentID,
                fullname,
                email,
                password,
            });
            if (status === Configs.Status.Successful) {
                OK(`تغییرات با موفقیت اعمال شد`);
                dispatch(TriggerRecordUpdate());

                reloadPage();
            }
        } catch (err) {
            if (!Configs.Status.isErrorExpected(err))
                Error(
                    "خطایی در ذخیره تغییرات بوجود امد ... لطفا دوباره تلاش کنید",
                    { position: "top-left", closeOnClick: true }
                );
        }
        setLoading(false);
    };

    const changeMyPassword = async () => {
        setLoading(true);
        try {
            const { status } = await userServices.changeMyPassword({
                studentID,
                password,
                newPassword,
            });
            if (status === Configs.Status.Successful) {
                OK("رمز شما با موفقیت تغییر داده شد");
                dispatch(TriggerRecordUpdate());
                reloadPage();
            }
        } catch (err) {
            if (!Configs.Status.isErrorExpected(err))
                Sorry(
                    "خطایی در ذخیره تغییرات بوجود امد ... لطفا دوباره تلاش کنید"
                );
        }
        setLoading(false);
    };

    const selectMode = (e) => {
        e.preventDefault();
        switch (pageMode) {
            case MODES.EDIT:
                saveChanges();
                return;
            case MODES.CHANGE_PASS:
                changeMyPassword();
                return;
            default:
                return;
        }
    };
    const checkConfirmPassword = (event) => {
        setConfirmNewPassword(event.target.value);
        if (newPassword !== event.target.value) {
            event.target.setCustomValidity(
                "تایید رمز عبور جدید باید با خود رمز عبور جدید مطابقت کامل داشته باشد"
            );
            //console.log(password, confirmPassword);
        } else event.target.setCustomValidity("");
    };

    // *************************** DESIGN NOTE *******/
    // HOW ABOUT USING TABS ? <Tabs>
    return (
        <Fragment>
            <Card
                border="secondary"
                bg="transparent"
                className="big-single-card">
                <Card.Header className="text-center">
                    <Row className="w-100 mx-auto">
                        <Col>
                            <Button
                                block
                                onClick={() => setPageMode(MODES.READ_ONLY)}
                                variant={`${
                                    !pageMode
                                        ? "outline-primary"
                                        : "outline-secondary"
                                }`}>
                                {pageMode === MODES.READ_ONLY && (
                                    <i
                                        className="fa fa-dot-circle-o px-2"
                                        aria-hidden="true"></i>
                                )}
                                فقط مشاهده
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                block
                                onClick={() => setPageMode(MODES.EDIT)}
                                variant={`${
                                    pageMode === MODES.EDIT
                                        ? "outline-primary"
                                        : "outline-secondary"
                                }`}>
                                {pageMode === MODES.EDIT && (
                                    <i
                                        className="fa fa-dot-circle-o px-2"
                                        aria-hidden="true"></i>
                                )}
                                ویرایش
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                block
                                onClick={() => setPageMode(MODES.CHANGE_PASS)}
                                variant={`${
                                    pageMode === MODES.CHANGE_PASS
                                        ? "outline-primary"
                                        : "outline-secondary"
                                }`}>
                                {pageMode === MODES.CHANGE_PASS && (
                                    <i
                                        className="fa fa-dot-circle-o px-2"
                                        aria-hidden="true"></i>
                                )}
                                تغییر رمز عبور
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Form onSubmit={(e) => selectMode(e)}>
                    <Card.Body className="w-75 text-center mx-auto">
                        <LoadingBar loading={loading} />

                        {pageMode !== MODES.CHANGE_PASS && (
                            <Fragment>
                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        شماره دانشجویی
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        disabled
                                        className="account-info-textbox w-75"
                                        placeholder="Student ID"
                                        value={studentID}
                                    />
                                </Form.Group>
                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        نام کاربر
                                    </Form.Label>
                                    <Form.Control
                                        disabled={!pageMode}
                                        type="text"
                                        className="account-info-textbox w-75"
                                        pattern="[آ-ی ]{6,}" // persian characters and space
                                        onInput={(e) =>
                                            e.target.setCustomValidity("")
                                        }
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity(
                                                "نام خانوادگی باید با حروف فارسی و با حداقل طول سه حرف باشد"
                                            )
                                        }
                                        placeholder="Full Name"
                                        value={fullname}
                                        required="required"
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        ایمیل
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        disabled={!pageMode}
                                        pattern=".{6,}"
                                        onInput={(e) =>
                                            e.target.setCustomValidity("")
                                        }
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity(
                                                "ورودی باید فرمت معتبر ایمیل را رعایت کرده و حداقل 6 کاراکتر باشد"
                                            )
                                        }
                                        className="account-info-textbox w-75"
                                        placeholder="E-mail"
                                        value={email}
                                        required="required"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Fragment>
                        )}
                        {pageMode !== MODES.READ_ONLY && (
                            <Form.Group className="form-inline">
                                <Form.Label className="w-25">
                                    {`رمز عبور ${
                                        pageMode === MODES.CHANGE_PASS
                                            ? "فعلی"
                                            : ""
                                    }`}
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    className="account-info-textbox w-75"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                        )}
                        {pageMode === MODES.CHANGE_PASS && (
                            <>
                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        رمز عبور جدید
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        pattern=".{6,15}"
                                        onInput={(e) =>
                                            e.target.setCustomValidity("")
                                        }
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity(
                                                "رمز عبور باید حداقل 6 کاراکتر و حداکثر 15 کاراکتر داشته باشد"
                                            )
                                        }
                                        className="account-info-textbox w-75"
                                        placeholder="New Password"
                                        value={newPassword}
                                        required="required"
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        تایید رمز عبور جدید
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        className="account-info-textbox w-75"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        required="required"
                                        onChange={(event) =>
                                            checkConfirmPassword(event)
                                        }
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            type="submit"
                            disabled={!pageMode}
                            block
                            variant="success"
                            className="w-50 mx-auto">
                            <i
                                className="fa fa-wrench px-2"
                                aria-hidden="true"></i>
                            ثبت تغییرات
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Fragment>
    );
};

export default AccountCredentials;
