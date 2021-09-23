import React, { Component } from "react";
import ModalSignIn from "./ModalSignIn";
import "./users.css";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";

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
        const STATUS = { USER_CREATED: 201, ALREADY_EXISTS: 403 };
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

                if (status === STATUS.USER_CREATED) {
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
            } catch (ex) {
                // console.log(ex);
                this.setState({ loading: false });
                if (ex.response.status === STATUS.ALREADY_EXISTS) {
                    toast.error(
                        "کاربری با این شماره دانشجویی یا ایمیل قبلا ثبت نام کرده است",
                        {
                            position: "top-right",
                            closeOnClick: true,
                        }
                    );
                    toast.warn(
                        "اگر رمز عبور خود را فراموش کرده اید، از گزینه بازیابی رمز عبور در صفحه ی ورود استفاده نمایید",
                        {
                            position: "top-right",
                            closeOnClick: true,
                        }
                    );
                } else {
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
            <div className="card border-success mb-3 signUpCard">
                <LoadingBar loading={loading} />
                <div className="card-header bg-transparent text-center border-success">
                    فرم ثبت نام
                </div>
                <div className="card-body">
                    <form onSubmit={(event) => this.onSignUpSubmit(event)}>
                        <div className="form-inline">
                            <label className="w-25">نام</label>
                            <input
                                type="text"
                                pattern="[آ-ی ]{3,}" // persian characters and space
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "نام باید با حروف فارسی و با حداقل طول سه حرف باشد"
                                    )
                                }
                                className="signUpTextBox form-control w-75"
                                placeholder="First Name"
                                value={firstname}
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        firstname: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-inline">
                            <label className="w-25">نام خانوادگی</label>
                            <input
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
                        </div>

                        <div className="form-inline">
                            <label className="w-25">شماره دانشجویی</label>
                            <input
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
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        studentID: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-inline">
                            <label className="w-25">ایمیل</label>
                            <input
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
                        </div>

                        <div className="form-inline">
                            <label className="w-25">رمز عبور</label>
                            <input
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
                                required="required"
                                onChange={(e) =>
                                    this.setState({
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-inline">
                            <label className="w-25">تایید رمز عبور</label>
                            <input
                                type="password"
                                className="signUpTextBox form-control w-75"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                required="required"
                                onChange={(event) =>
                                    this.checkConfirmPassword(event)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success btn-block mt-4">
                            <i
                                class="fa fa-user-plus px-3"
                                aria-hidden="true"></i>
                            ثبت نام
                        </button>
                    </form>
                    <p className="forgot-password text-right mt-5">
                        اگر قبلا ثبت نام کردی، به صفحه ی <ModalSignIn /> برو !
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
