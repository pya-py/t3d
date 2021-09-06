import { Button, Form, Modal } from "react-bootstrap";
import { Component } from "react";
import userServices from "../services/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";
class ModalSignIn extends Component {
    // *********************Objectives***********************
    // 1. handle errors particularly
    state = {
        showModal: false,
        studentID: "",
        password: "",
        loading: false,
    };

    onCloseClick = () => this.setState({ showModal: false });
    onShowClick = () => this.setState({ showModal: true });

    onSignInSubmitted = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const STATUS = { SUCCESSFULL: 200, AUTHENTICATION_INVALID: 401 };
        const { studentID, password } = this.state;
        const user = { studentID, password: Number(password) };
        try {
            const { status, data } = await userServices.signIn(user);
            if (status === STATUS.SUCCESSFULL) {
                userServices.saveUser(data.userID, data.token);
                this.props.history.replace("/");
            }
        } catch (ex) {
            // check nonserver errors
            this.setState({ password: "" });
            //toast.error('.ورود با مشکل رو به رو شد. لطفا دوباره تلاش کتنید.', {position: 'top-right', closeOnClick: true});
        }
        this.setState({ loading: false });
    };

    onForgotPasswordClick = () => {};

    render() {
        const { showModal, studentID, password, loading } = this.state;

        return (
            <>
                <LoadingBar loading={loading} />
                <Button variant="outline-primary" onClick={this.onShowClick}>
                    ورود کاربران
                </Button>

                <Modal show={showModal} onHide={this.onCloseClick}>
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                        <Form
                            className="m-4 text-right"
                            onSubmit={(event) => this.onSignInSubmitted(event)}
                        >
                            <Form.Group className="mb-3 form-inline">
                                <Form.Label className="w-25">
                                    شماره دانشجویی
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="w-75 text-left"
                                    placeholder="Student ID"
                                    value={studentID}
                                    onChange={(e) =>
                                        this.setState({
                                            studentID: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 form-inline"
                                controlId="formBasicPassword"
                            >
                                <Form.Label className="w-25">
                                    رمز عبور
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    className="w-75 text-left"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        this.setState({
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <>
                                <Button
                                    className="w-50"
                                    type="submit"
                                    variant="outline-success"
                                >
                                    ورود
                                </Button>
                                <Button
                                    className="w-50"
                                    variant="outline-info"
                                    onClick={this.onForgotPasswordClick}
                                >
                                    فراموشی رمز
                                </Button>
                            </>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default withRouter(ModalSignIn);
