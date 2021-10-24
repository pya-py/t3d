import { Fragment, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import LoadingBar from "../commons/LoadingBar";
import { Attention, Notify } from "../tools/notification";
import {
	CloseRandomSearch,
	ReapeatRandomSearch,
} from "../globals/redux/actions/tools";
import { EnterRoom } from "../globals/redux/actions/game";
import GlobalContext from "../globals/state/GlobalContext";
import { Routes } from "../services/configs";
const SingleGame = () => {
	const [gameType, setGameType] = useState(4);
	const me = useSelector((state) => state.me);
	const [searching, setSearching] = useState(false);
    const context = useContext(GlobalContext);
	const dispatch = useDispatch();
	const tools = useSelector((state) => state.tools);

	const onStartGameClick = (event) => {
		event.preventDefault();
		if (me) {
			dispatch(EnterRoom({ name: null, type: gameType }));
			dispatch(ReapeatRandomSearch());
			setSearching(true);
		}
		// random game:
		else {
			Attention("ابتدا باید وارد حساب کاربری خود شوید");
            context.goTo(Routes.Client.SignUp);
		}
	};
	const { randomSearchRepeats } = tools;

	useEffect(() => {
		if (searching && !randomSearchRepeats) {
			//means no one has been found after a specific amount of time
			Notify("حریفی پیدا نشد ... لحظاتی دیگر مجددا تلاش کنید");
			setSearching(false);
		}
	}, [searching, randomSearchRepeats]);
	//on destroy
	useEffect(() => {
		return () => {
			setSearching(false); //make sure preloader turns off
			dispatch(CloseRandomSearch());
		};
	}, [dispatch]);

	return (
		<Fragment>
			<LoadingBar loading={searching} />
			<hr />
			<Form onSubmit={(event) => onStartGameClick(event)}>
				<Form.Group className="form-inline">
					<Form.Label className="pb-2 w-25">ابعاد جدول</Form.Label>
					<InputGroup
						style={{
							border: "1px solid orange",
							borderRadius: "5px",
							padding: "2%",
						}}>
						<InputGroup.Prepend className="mx-3">
							<InputGroup.Radio
								value="3"
								name="tableDimension"
								checked={gameType === 3}
								onChange={() => setGameType(3)}
							/>
							<InputGroup.Text>3 * 3 * 3</InputGroup.Text>
						</InputGroup.Prepend>
						<InputGroup.Prepend className="mx-3">
							<InputGroup.Radio
								value="4"
								name="tableDimension"
								checked={gameType === 4}
								onChange={() => setGameType(4)}
							/>
							<InputGroup.Text>4 * 4 * 4</InputGroup.Text>
						</InputGroup.Prepend>
						<InputGroup.Prepend className="mx-3">
							<InputGroup.Radio
								value="5"
								name="tableDimension"
								checked={gameType === 5}
								onChange={() => setGameType(5)}
							/>
							<InputGroup.Text>5 * 5 * 5</InputGroup.Text>
						</InputGroup.Prepend>
					</InputGroup>
				</Form.Group>
				<hr />
				<Button type="submit" className="mt-4 animated-button" block variant="success">
					<i className="fa fa-search px-2" aria-hidden="true"></i>
					جستجو
				</Button>
			</Form>
		</Fragment>
	);
};

export default SingleGame;
