import { useSelector } from "react-redux";
import MatchesTable from "./matches/MatchesTable";
import { Tab, Tabs, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
const LeagueHome = () => {
	const league = useSelector((state) => state.league);
	const [matches, setMatches] = useState([]);
	useEffect(() => {
		if (league && league.matches) {
			const matches = league.matches[league.matches.length - 1].map(
				(match) => {
					const playerXIndex = league.contesters.findIndex(
						(cont) => cont.userID === match[0]
					);
					const playerOIndex = league.contesters.findIndex(
						(cont) => cont.userID === match[1]
					);
					const names = [
						playerXIndex >= 0
							? league.contesters[playerXIndex].fullname
							: "ناشناس",
						playerOIndex >= 0
							? league.contesters[playerOIndex].fullname
							: "ناشناس",
					];
					return names;
				}
			);
			setMatches(matches);
		}
	}, [league]);
	return (
		<Card border="secondary" bg="transparent" className="game-deck-card">
			<Card.Body>
				<Tabs
					defaultActiveKey="draws"
					variant="pills"
					// transition={Fade}
					className="mb-3">
					<Tab eventKey="draws" title="بازی ها">
						<hr />
						<MatchesTable matches={matches} />
					</Tab>
					<Tab eventKey="table" title="جدول">
						<hr />
					</Tab>
					<Tab eventKey="details" title="جزییات">
						<hr />
					</Tab>
				</Tabs>
			</Card.Body>
		</Card>
	);
};

export default LeagueHome;
