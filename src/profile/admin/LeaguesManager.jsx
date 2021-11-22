import { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import LoadingBar from "../../commons/LoadingBar";
import { Sorry, OK } from "./../../tools/notification";
import gameServices from "./../../services/http/gameServices";
import { Status } from "../../services/configs";

const LeaguesManager = () => {
	const [Mode, setMode] = useState(0);
	const [title, setTitle] = useState("");
	const [capacity, setCapacity] = useState(20);
	const [prize, setPrize] = useState(50);
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState("");

	const create = async (event) => {
		event.preventDefault();
		try {
			setLoading(true);
			const { status } = await gameServices.createLeague(
				Mode,
				title,
				capacity,
				prize
			);
			if (status === Status.CreatedSuccessfully)
				OK(`لیگ ${title} با موفقیت ساخته شد.`);
		} catch (err) {
			if (!Status.isErrorExpected(err))
				Sorry(
					"خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
				);
			setLoading(false);
		}
		setLoading(false);
	};
	const Modes = { Kickout: 0, Main: 1, Championship: 2, Custom: 3 };

	return (
		<Form onSubmit={(e) => create(e)}>
			<LoadingBar loading={loading} />
			<Card
				border="success"
				bg="transparent"
				className="mx-auto notice-manager-card">
				<Card.Header className="text-center">اطلاعیه جدید</Card.Header>
				<Card.Body className="text-right">
					<Row className="mt-3 justify-content-center">
						<Form.Label className="text-center">نوع لیگ</Form.Label>
					</Row>
					<hr />
					<Row className="m-0 p-0">
						<Col className="mt-3 text-center" xs={3}>
							<Button
								variant={
									Mode === Modes.Kickout
										? "success"
										: "outline-secondary"
								}
								onClick={() => setMode(Modes.Kickout)}
								block>
								حذفی
							</Button>
						</Col>
						<Col className="mt-3 text-center" xs={3}>
							<Button
								variant={
									Mode === Modes.Main
										? "success"
										: "outline-secondary"
								}
								onClick={() => setMode(Modes.Main)}
								block>
								امتیازی
							</Button>
						</Col>
						<Col className="mt-3 text-center" xs={3}>
							<Button
								variant={
									Mode === Modes.Championship
										? "success"
										: "outline-secondary"
								}
								block
								onClick={() => setMode(Modes.Championship)}>
								قهرمانان
							</Button>
						</Col>
						<Col className="mt-3 text-center" xs={3}>
							<Button
								variant={
									Mode === Modes.Custom
										? "success"
										: "outline-secondary"
								}
								block
								onClick={() => setMode(Modes.Custom)}>
								کاستوم
							</Button>
						</Col>
					</Row>
					<hr />

					<Row className="mt-3">
						<Col className="mt-3 text-center" xs={2}>
							<Form.Label className="text-center">
								نام لیگ
							</Form.Label>
						</Col>

						<Col>
							<Form.Control
								type="text"
								className="account-info-textbox animated-textbox"
								pattern="[آ-ی ]{3,}" // persian characters and space
								onInput={(e) => e.target.setCustomValidity("")}
								onInvalid={(e) =>
									e.target.setCustomValidity(
										"نام لیگ باید با حروف فارسی و با حداقل طول سه حرف باشد"
									)
								}
								placeholder="نام لیگ"
								value={title}
								required="required"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Col>
					</Row>
					<hr />
					<Row className="mt-3 justify-content-center">
						<Form.Label className="text-center">تنظیمات</Form.Label>
					</Row>
					<Row>
						<Col className="mt-3 text-center">
							<hr />

							<Row className="justify-content-around">
								<Form.Label className="text-center">
									ظزفیت
								</Form.Label>
							</Row>
							<hr />
							<Form.Control
								type="number"
								className="account-info-textbox animated-textbox text-center"
								placeholder="ظرفیت"
								value={capacity}
								required="required"
								onChange={(e) => setCapacity(e.target.value)}
							/>
						</Col>
						<Col className="mt-3 text-center">
							<hr />
							<Row className="justify-content-around">
								<Form.Label className="text-center">
									جایزه(امتیاز)
								</Form.Label>
							</Row>
							<hr />
							<Form.Control
								type="number"
								className="account-info-textbox animated-textbox text-center"
								placeholder="جایزه"
								value={prize}
								required="required"
								onChange={(e) => setPrize(e.target.value)}
							/>
						</Col>
					</Row>
				</Card.Body>
				<Card.Footer className="p-1 m-0 mt-4">
					<Row>
						<Col lg={2} md={2} sm={4} xs={4}>
							<Form.Label className="text-center w-100 mt-3">
								رمزعبور فعلی
							</Form.Label>
						</Col>
						<Col lg={7} md={7} sm={8} xs={8}>
							<Form.Control
								type="password"
								className="text-left account-info-textbox animated-textbox"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								onInput={(e) => e.target.setCustomValidity("")}
								onInvalid={(e) =>
									e.target.setCustomValidity(
										"جهت اعمال هر گونه تغییر در حساب کاربری تان باید رمز عبور خود را وارد نمایید"
									)
								}
							/>
						</Col>
						<Col lg={3} md={3} sm={12} xs={12}>
							<Button
								type="submit"
								block
								variant="info"
								className="mt-2 animated-button">
								<i
									className="fa fa-floppy-o px-2"
									aria-hidden="true"></i>
								ساخت لیگ
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</Form>
	);
};

export default LeaguesManager;
