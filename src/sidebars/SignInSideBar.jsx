import { Component } from "react";
import "./sidebars.css";
import userServices from "../services/http/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../commons/LoadingBar";
import Configs, { browserStorage } from "../services/configs";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { Sorry } from "../tools/msgbox";

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
                console.log(data);
                browserStorage.writeUser(data.userID, data.token);
                this.props.history.replace("/");
            }
        } catch (err) {
            // check nonserver errors
            console.log(err);
            this.setState({ password: "" });
            if (!Configs.Status.isErrorExpected(err))
                Sorry(
                    ".ورود با مشکل رو به رو شد. لطفا دوباره تلاش کتنید.",
                    { position: "top-left", closeOnClick: true }
                );
        }
        this.setState({ loading: false });
    };

    render() {
        const { studentID, password, loading } = this.state;
        return (
            <Card border="primary" className="sign-in-sidebar">
                <Card.Header
                    border="primary"
                    className="text-center text-primary">
                    ورود کاربران
                </Card.Header>
                <LoadingBar loading={loading} />
                <Card.Body className="text-primary">
                    <Form onSubmit={(event) => this.onSignInSubmitted(event)} >
                        <Form.Control
                            type="text"
                            autoComplete="username"
                            className="sign-in-sidebar-textBox"
                            placeholder="شماره دانشجویی"
                            value={studentID}
                            onChange={(e) =>
                                this.setState({ studentID: e.target.value })
                            }
                        />
                        <br />
                        <Form.Control
                            type="password"
                            autoComplete="current-password"
                            className="sign-in-sidebar-textBox"
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
                                        type="submit"
                                        variant="success"
                                        className="sign-in-sidebar-buttons">
                                        <i
                                            className="fa fa-sign-in px-3"
                                            aria-hidden="true"></i>
                                        ورود
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        className="sign-in-sidebar-buttons"
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
