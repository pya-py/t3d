import React, { Component } from "react";
import ModalSignIn from "./ModalSignIn";
import "./users.css";
import { toast } from "react-toastify";
import userServices from "../services/http/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";
import Configs from '../services/configs';
import { Card, Form , Button} from "react-bootstrap";

class SignUp extends Component {
    // *********************Objectives***********************
    // 1. handle errors particularly
    // 2. first and last name must be persian text so make the direction correct and force persian chars
    state = {
        studentID: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        email: "",
        loading: false,
    };

    checkConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
        if (this.state.password !== event.target.value) {
            event.target.setCustomValidity(
                "تایید رمز عبور باید با خود رمز عبور مطابقت کامل داشته باشد"
            );
            //console.log(password, confirmPassword);
        } else event.target.setCustomValidity("");
    };
    onSignUpSubmit = async (event) => {
        event.preventDefault();
        const {
            studentID,
            password,
            confirmPassword,
            firstname,
            lastname,
            email,
        } = this.state;
        if (firstname.trim().length < 3 || lastname.trim().length < 3) {
            toast.error("نام و نام خانوادگی باید حداقل شام سه حرف فارسی باشد", {
                position: "top-right",
                closeOnClick: true,
            });
            this.setState({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
            });
            return;
        }
        if (password === confirmPassword) {
            try {
                this.setState({ loading: true });
                const newUser = {
                    studentID: Number(studentID),
                    password,
                    email,
                    fullname: (firstname + " " + lastname).replace(/\s+/g, " "), // correct? (iterative?)
                };

                const { status, data } = await userServices.signUp(newUser);

                if (status === Configs.Status.CreatedSuccessfully) {
                    //console.log(data);
                    toast.success(`ثبت نام با موفقیت انجام شد`, {
                        position: "top-right",
                        closeOnClick: true,
                    });
                    userServices.saveUser(data.userID, data.token);
                    this.props.history.replace("/");
                    // this.props.history.replace('/signIn')
                    // ******* change server to return user token and auto sign in
                }
            } catch (err) {
                // console.log(err);
                this.setState({ loading: false });
                if (err.response.status === Configs.Status.Conflict) {
                    // toast.error(
                    //     "کاربری با این شماره دانشجویی یا ایمیل قبلا ثبت نام کرده است",
                    //     {
                    //         position: "top-right",
                    //         closeOnClick: true,
                    //     }
                    // );
                    toast.warn(
                        "اگر رمز عبور خود را فراموش کرده اید، از گزینه بازیابی رمز عبور در صفحه ی ورود استفاده نمایید",
                        {
                            position: "top-right",
                            closeOnClick: true,
                        }
                    );
                } else if(!Configs.Status.isErrorExpected(err)){
                    toast.error(
                        "ثبت نام با مشکل رو به رو شد. لطفا دوباره تلاش کتنید",
                        {
                            position: "top-right",
                            closeOnClick: true,
                        }
                    );
                }
            }
        } else {
            toast.error("رمز عبورها مطابقت ندارند", {
                position: "top-right",
                closeOnClick: true,
            });
        }
        this.setState({ loading: false });
    };

    render() {
        const {
            studentID,
            password,
            confirmPassword,
            firstname,
            lastname,
            email,
            loading,
        } = this.state;

        return (
            <Card border="success" className="mb-3 signUpCard">
                <LoadingBar loading={loading} />
                <Card.Header className="bg-transparent text-center border-success">
                    فرم ثبت نام
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(event) => this.onSignUpSubmit(event)}>
                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">نام</Form.Label>
                            <Form.Control
                                type="text"
                                pattern="[آ-ی ]{3,}" // persian characters and space
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "نام باید با حروف فارسی و با حداقل طول سه حرف باشد"
                                    )
                                }
                                className="signUpTextBox w-75"
                                placeholder="First Name"
                                value={firstname}
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        firstname: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">نام خانوادگی</Form.Label>
                            <Form.Control
                                type="text"
                                className="signUpTextBox form-control w-75"
                                pattern="[آ-ی ]{3,}" // persian characters and space
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "نام خانوادگی باید با حروف فارسی و با حداقل طول سه حرف باشد"
                                    )
                                }
                                placeholder="Last Name"
                                value={lastname}
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        lastname: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">شماره دانشجویی</Form.Label>
                            <Form.Control
                                type="text"
                                pattern="[0-9]{8}"
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "شماره دانشجویی باید یک عدد 8 رقمی باشد"
                                    )
                                }
                                className="signUpTextBox form-control w-75"
                                placeholder="Student ID"
                                value={studentID}
                                autoComplete="username"
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        studentID: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">ایمیل</Form.Label>
                            <Form.Control
                                type="email"
                                pattern=".{6,}"
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "ورودی باید فرمت معتبر ایمیل را رعایت کرده و حداقل 6 کاراکتر باشد"
                                    )
                                }
                                className="signUpTextBox form-control w-75"
                                placeholder="E-mail"
                                value={email}
                                required="required"
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">رمز عبور</Form.Label>
                            <Form.Control
                                type="password"
                                pattern=".{6,15}"
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "رمز عبور باید حداقل 6 کاراکتر و حداکثر 15 کاراکتر داشته باشد"
                                    )
                                }
                                className="signUpTextBox form-control w-75"
                                placeholder="Password"
                                value={password}
                                autoComplete="new-password"
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="form-inline">
                            <Form.Label className="w-25">تایید رمز عبور</Form.Label>
                            <Form.Control
                                type="password"
                                className="signUpTextBox form-control w-75"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                required="required"
                                onChange={(event) =>
                                    this.checkConfirmPassword(event)
                                }
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="btn btn-success btn-block mt-4">
                            <i
                                className="fa fa-user-plus px-2"
                                aria-hidden="true"></i>
                            ثبت نام
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="border-primary bg-transparent">
                        اگر قبلا ثبت نام کردی، به صفحه ی <ModalSignIn /> برو !
                </Card.Footer>
            </Card>
        );
    }
}

export default withRouter(SignUp);
