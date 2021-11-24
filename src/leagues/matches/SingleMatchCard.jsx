import { Card, Row } from "react-bootstrap";
import "./matches.css";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { toTimeShort } from "../../tools/format";

const SingleMatchCard = ({ Type, date, playerX, playerO, schedule }) => {
	const me = useSelector(state => state.me);
	const [cardOnClick, setCardOnClick] = useState(() => {});
	const [cardColor, setCardColor] = useState(null);
	
	// change this structure to remove using of context
	
	useEffect(() => {
		const now = new Date();
		console.log("now: ", now, "\nschedule: ", schedule);
		if(me && (me.userID.toString() === playerX.userID.toString() || me.userID.toString() === playerO.userID.toString())){
			if(now >= new Date(schedule)){
				// if its due is passed, make the cardf red indicating the player has lost the game
				// other wise add a onClick and color to the corresponding card
				setCardColor("success");
				setCardOnClick( () => {
					// trig event in GlobbalSocket to create the room for game
					
				})
			}
		}
	}, [schedule, playerO, playerO, me])
	return (
		<Card bg={cardColor} border="primary" className="single-match-card">
			<Card.Body>
				<Row className="text-center mx-auto">
					<span className="col-lg-5 col-md-6 text-right">
						{playerX.fullname}
					</span>
					<span className="col-lg-2 col-md-2 text-center">{toTimeShort(schedule)}</span>
					<span className="col-lg-5 col-md-6 text-left">
						{playerO.fullname}
					</span>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default SingleMatchCard;
