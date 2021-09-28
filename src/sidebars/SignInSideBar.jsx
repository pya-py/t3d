import { Component } from "react";
import "./sidebars.css";
import userServices from "../services/http/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";
import Configs from "../services/configs";
import { toast } from "react-toastify";
import { Card, Form, Button, Col, Row } from "react-bootstrap";

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
            <Card border="primary" className="signInSidebar">
                <Card.Header
                    border="primary"
                    className="text-center text-primary">
                    ورود کاربران
                </Card.Header>
                <LoadingBar loading={loading} />
                <Card.Body className="text-primary">
                    <Form onSubmit={(event) => this.onSignInSubmitted(event)}>
                        <Form.Control
                            type="text"
                            className="signInSidebarTextBox"
                            placeholder="شماره دانشجویی"
                            value={studentID}
                            onChange={(e) =>
                                this.setState({ studentID: e.target.value })
                            }
                        />
                        <br />
                        <Form.Control
                            type="password"
                            className="signInSidebarTextBox"
                            placeholder="رمز عبور"
                            value={password}
                            onChange={(e) =>
                                this.setState({ password: e.target.value })
                            }
                        />
                        <br />
                        <Card.Footer className="bg-transparent border-primary">
                            <Row>
                                <Col>
                                    <Button
                                        id="btnSideBarSignIn"
                                        type="submit"
                                        variant="success"
                                        className="h-100">
                                        <i
                                            className="fa fa-sign-in px-3"
                                            aria-hidden="true"></i>
                                        ورود
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        id="btnSideBarPasswordRecovery"
                                        className="h-100"
                                        variant="warning">
                                        <i
                                            className="fa fa-recycle px-3"
                                            aria-hidden="true"></i>
                                        بازیابی پسورد
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(SignInSideBar);
