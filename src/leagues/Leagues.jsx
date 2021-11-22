import { Col, Nav, Row, Tab, Container } from "react-bootstrap";
import "./leagues.css";
import { useEffect, useState } from "react";
import gameServices from "../services/http/gameServices";
import { Status } from "../services/configs";
import { Sorry } from "../tools/notification";
import SingleLeagueCard from "./SingleLeagueCard";
const Leagues = () => {
	const [leagues, setLeagues] = useState([]);
	const [reload, triggerReload] = useState(false); //a trigger for run reload competition and leagues when needed
	useEffect(() => {
		(async () => {
			try {
				const { data, status } = await gameServices.listLeagues();
				if (status === Status.Successful) setLeagues([...data.leagues]);

			} catch (err) {
				if (!Status.isErrorExpected(err))
					Sorry(
						"خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
					);
			}
		})();
	}, [reload]);


	return (
		<Container>
			<hr />
			<Row>
			{leagues.map(league => 
				<Col className="mb-5" lg={6} md={6} sm={12} xs={12}><SingleLeagueCard reload={() => triggerReload(!reload)} league={league} /></Col>
			)}
			</Row>
		</Container>
	);
};

export default Leagues;
		// <Tab.Container id="left-tabs-example" defaultActiveKey="first">
		// 	<hr />
		// 	<Row>
		// 		<Col className="competition-menu-body" sm={3}>
		// 			<Nav variant="pills" className="flex-column">
		// 				{leagues.map((league) => (
		// 					<Nav.Item>
		// 						<Nav.Link
		// 							className="text-right"
		// 							eventKey={league.leagueID}>
		// 							{league.title}
		// 						</Nav.Link>
		// 					</Nav.Item>
		// 				))}
		// 			</Nav>
		// 		</Col>
		// 		{/* <div style={{borderLeft: '1px solid gray', height:'500px'}}></div> */}
		// 		<Col sm={9}>
		// 			<Tab.Content>
		// 				{leagues.map((league) => (
		// 					<Tab.Pane eventKey={league.leagueID}>
		// 						<LeagueDescription league={league} />
		// 					</Tab.Pane>
		// 				))}
		// 			</Tab.Content>
		// 		</Col>
		// 	</Row>
		// </Tab.Container>