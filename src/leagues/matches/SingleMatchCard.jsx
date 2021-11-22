import { Card, Container, Row } from "react-bootstrap";
import "./scores.css";
import { useContext } from "react";
import GlobalContext from "../../globals/state/GlobalContext";
import { Devices } from "../../services/configs";

const SingleMatchCard = ({
	Type,
	date,
	playerXName,
	playerOName,
}) => {

	const context = useContext(GlobalContext);

	// change this structure to remove using of context
	return (
		<Card border="dark" className="single-score-card">
			<Card.Body>
				<Row className="text-center mx-auto">
					{context.device !== Devices.SmartPhone ? (
						<>
							<span className="col-lg-5 col-md-6 text-right">
								{playerXName}
							</span>
							<span className="col-lg-2 col-md-2 text-center">
								----
							</span>
							<span className="col-lg-5 col-md-6 text-left">
								{playerOName}
							</span>
						</>
					) : (
						<Container>
							<Row>
								<span className="col-10 text-right">{playerXName}</span>
							</Row>
                            <hr />
							<Row>
								<span className="col-10 text-right">
									{playerOName}
								</span>
							</Row>
						</Container>
					)}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default SingleMatchCard;
