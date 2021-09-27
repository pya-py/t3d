import { Component } from "react";
import "./sidebars.css";
import userServices from "../services/http/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";
import Configs from "../services/configs";
import { toast } from "react-toastify";

class SignInSideBar extends Component {
    // *********************Objectives***********************
    // 1. handle errors particularly
    state = {
        studentID: "",
        password: "",
        loading: false,
    };

    onSignInSubmitted = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { studentID, password } = this.state;
        const user = { studentID: Number(studentID), password };
        try {
            const { status, data } = await userServices.signIn(user);
            if (status === Configs.Status.Successful) {
                userServices.saveUser(data.userID, data.token);
                this.props.history.replace("/");
            }
        } catch (err) {
            // check nonserver errors
            // console.log(err);
            this.setState({ password: "" });
            if (!Configs.Status.isErrorExpected(err))
                toast.error(
                    ".ورود با مشکل رو به رو شد. لطفا دوباره تلاش کتنید.",
                    { position: "top-left", closeOnClick: true }
                );
        }
        this.setState({ loading: false });
    };

    render() {
        const { studentID, password, loading } = this.state;
        return (
            <div className="card signInSidebar border-primary">
                <div className="card-header text-center text-primary border-primary">
                    ورود کاربران
                </div>
                <LoadingBar loading={loading} />
                <div className="card-body text-primary">
                    <form onSubmit={(event) => this.onSignInSubmitted(event)}>
                        <input
                            type="text"
                            className="signInSidebarTextBox form-control text-primary"
                            placeholder="Student ID"
                            value={studentID}
                            onChange={(e) =>
                                this.setState({ studentID: e.target.value })
                            }
                        />
                        <br />
                        <input
                            type="password"
                            className="signInSidebarTextBox form-control text-primary"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                this.setState({ password: e.target.value })
                            }
                        />
                        <br />
                        <div className="card-footer bg-transparent border-primary">
                            <button
                                id="btnSideBarSignIn"
                                type="submit"
                                className="btn btn-outline-success btn-lg">
                                <i
                                    className="fa fa-sign-in px-3"
                                    aria-hidden="true"></i>
                                ورود
                            </button>
                            <button
                                id="btnSideBarPasswordRecovery"
                                className="btn btn-outline-info btn-lg">
                                <i
                                    className="fa fa-recycle px-3"
                                    aria-hidden="true"></i>
                                بازیابی پسورد
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignInSideBar);
