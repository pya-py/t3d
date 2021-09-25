import { Fragment, useState, useEffect } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import LoadingBar from "../common/LoadingBar";
import "./controlpanel.css";
import userServices from "./../services/userServices";
import Configs from "../services/configs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { TriggerRecordUpdate } from "../dashboard/actions";

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

    const dispatch = useDispatch();
    //on component mount download user credentials
    useEffect(() => {
        (async () => {
            setLoading(true);
            const { status, data } = await userServices.getMyCredentials();
            if (status === Configs.Status.Successful) return data.me;

            return null;
        })()
            .then((me) => {
                setFullname(me.fullname);
                setStudentID(me.studentID);
                setEmail(me.email);
                setLoading(false);
            })
            .catch((err) => {
                if (!Configs.Status.isErrorExpected(err))
                    toast.error(
                        "حین دریافت اطلاعات کاربر ایرادی پیش آمد. ... لطفا دوباره تلاش کنید.",
                        { position: "top-left", closeOnClick: true }
                    );
                setLoading(false);
            });
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
                toast.success(`تغییرات با موفقیت اعمال شد`, {
                    position: "top-right",
                    closeOnClick: true,
                });
                dispatch(TriggerRecordUpdate());
                reloadPage();
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

    const updatePassword = () => {};

    const selectMode = (e) => {
        e.preventDefault();
        switch(pageMode){
            case MODES.EDIT:
                saveChanges();
                return;
            case MODES.CHANGE_PASS:
                updatePassword();
                return;
            default:
                return;
        }
    }
    return (
        <Fragment>
            <Card
                border="secondary"
                bg="transparent"
                className="mx-auto userInfoCard">
                <Card.Header className="text-center">
                    <Row className="w-50 mx-auto">
                        <Col>
                            <Button
                                block
                                onClick={() => setPageMode(MODES.READ_ONLY)}
                                variant={`${
                                    !pageMode
                                        ? "outline-primary"
                                        : "outline-secondary"
                                }`}>
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
                                تغییر رمز عبور
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Form onSubmit={e => selectMode(e)}>
                <Card.Body className="w-50 mx-auto">
                    <LoadingBar loading={loading} />

                    
                        {pageMode !== MODES.CHANGE_PASS && (
                            <>
                                <Form.Group className="form-inline">
                                    <Form.Label className="w-25">
                                        شماره دانشجویی
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        disabled
                                        className="userInfoTextBox form-control w-75"
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
                                        className="userInfoTextBox form-control w-75"
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
                                        className="userInfoTextBox form-control w-75"
                                        placeholder="E-mail"
                                        value={email}
                                        required="required"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </>
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
                                    className="userInfoTextBox form-control w-75"
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
                                        className="userInfoTextBox form-control w-75"
                                        placeholder="New Password"
                                        value={password}
                                        required="required"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
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
                                        className="userInfoTextBox form-control w-75"
                                        placeholder="New Password"
                                        value={password}
                                        required="required"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
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
                            className="fa fa-user-plus px-3"
                            aria-hidden="true"></i>
                        ذخیره تغییرات
                    </Button>
                </Card.Footer>
                </Form>
            </Card>
        </Fragment>
    );
};

export default AccountCredentials;
