import { Button, Form, Modal, Row } from "react-bootstrap";
import { Component, Fragment } from "react";
import userServices from "../services/http/userServices";
import { withRouter } from "react-router-dom";
import LoadingBar from "../commons/LoadingBar";
import Configs, { browserStorage } from "../services/configs";
import { Sorry } from "./../tools/notification";

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
		const { studentID, password } = this.state;
		const user = { studentID: Number(studentID), password };
		try {
			const { status, data } = await userServices.signIn(user);
			if (status === Configs.Status.Successful) {
				browserStorage.save(data.token);
				this.props.history.replace("/");
			}
		} catch (err) {
			// check nonserver errors
			this.setState({ password: "" });
			if (!Configs.Status.isErrorExpected(err))
				Sorry(".ورود با مشکل رو به رو شد. لطفا دوباره تلاش کتنید.");
		}
		this.setState({ loading: false });
	};

	onForgotPasswordClick = () => {};

	render() {
		const { showModal, studentID, password, loading } = this.state;

		return (
			<Fragment>
				<LoadingBar loading={loading} />
				<Button variant="outline-primary" onClick={this.onShowClick}>
					<i className="fa fa-user px-2" aria-hidden="true"></i>
					ورود کاربران
				</Button>

				<Modal
					backdrop="static"
					show={showModal}
					onHide={this.onCloseClick}>
					<Modal.Header closeButton></Modal.Header>

					<Modal.Body>
						<Form
							className="m-4 text-right"
							onSubmit={(event) => this.onSignInSubmitted(event)}>
							<Form.Group className="mb-3 form-inline">
								<Form.Label className="w-25">
									شماره دانشجویی
								</Form.Label>
								<Form.Control
									type="text"
									className="w-75 text-left"
									placeholder="Student ID"
									autoComplete="username"
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
								controlId="formBasicPassword">
								<Form.Label className="w-25">
									رمز عبور
								</Form.Label>
								<Form.Control
									type="password"
									className="w-75 text-left"
									placeholder="Password"
									autoComplete="current-password"
									value={password}
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
								/>
							</Form.Group>
							<hr />
							<Row>
								<Button
									className="w-50"
									type="submit"
									variant="outline-success">
									<i
										className="fa fa-sign-in px-2"
										aria-hidden="true"></i>
									ورود
								</Button>
								<Button
									className="w-50"
									variant="outline-warning"
									onClick={this.onForgotPasswordClick}>
									<i
										className="fa fa-recycle px-2"
										aria-hidden="true"></i>
									فراموشی رمز
								</Button>
							</Row>
						</Form>
					</Modal.Body>
				</Modal>
			</Fragment>
		);
	}
}

export default withRouter(ModalSignIn);
