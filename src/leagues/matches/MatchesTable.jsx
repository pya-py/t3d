import { Card } from "react-bootstrap";
import { useState, Fragment } from "react";
import SingleMatchCard from "./SingleMatchCard";

import "./scores.css";
const MatchesTable = ({ matches }) => {
	return (
		<Fragment>
			{Boolean(matches.length) ? (
				matches.map((match) => (
					<SingleMatchCard
						// key={match.gameID}

						playerXName={match[0]}
						playerOName={match[1]}></SingleMatchCard>
				))
			) : (
				<Card className="bg-transparent mx-auto mt-3" border="danger">
					<Card.Body className="text-center">
						<Card.Text>هیچ قرعه ای انجام نگرفته است</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Fragment>
	);
};

export default MatchesTable;
