import { Fragment, useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import BriefScoreboard from "./BriefScoreboard";
import "../games.css";

const TableDesign = ({
	timeRemaining,
	dimension,
	players,
	table,
	onEachCellClick
}) => {
	let dimens = [];
	const [cell, setCell] = useState(null);
	for (let i = 0; i < dimension; i++) dimens.push(i);

	useEffect(() => {
		const cellWidths = [70, 65, 60, 55, 50, 45, 40, 35, 30, 25];
		const cellHeights = [45, 40, 35, 30, 29, 28];
		const deviceWidth = window.innerWidth,
			deviceHeight = window.innerHeight;
		/* first decide cell height, margin nearly equals to height */
		let width = cellWidths[cellWidths.length - 1],
			height = cellHeights[cellHeights.length - 1],
			margin = cellHeights[cellHeights.length - 1],
            fontSize = 25;
		for (const h of cellHeights) {
			if (h * dimension * dimension <= deviceHeight * 0.75) {
				margin = height = h;
				break;
			}
		}
		for (const w of cellWidths) {
			if ((w + margin) * (dimension + 1) <= deviceWidth) {
				width = w;
				break;
			}
		}

        //find better scaling for font size?
        if(height < 30 || width < 40)
            fontSize = 15;
        else if(height < 40 || width < 60)
            fontSize = 20;
        else
            fontSize = 25;
		setCell({ width, height, margin, fontSize });
	}, [dimension]);

	//prop drilling in BriefScoreBoard
	return (
		<Card bg="transparent" border="dark" className="w-100 mt-2 mx-auto">
			<BriefScoreboard timeRemaining={timeRemaining} players={players} />
			<Card.Body className="game-border-card">
				{table ? (
					dimens.map((floor) => (
						<Fragment>
							{dimens.map((row) => (
								<Row
									style={{
										direction: "ltr",
										marginLeft: `${cell.margin * row}px`,
									}}>
									{dimens.map((column) => (
										<Button
											key={
												floor * dimension * dimension +
												row * dimension +
												column
											}
											variant="outline-dark"
											className="game-table-cells"
											style={{
												width: `${cell.width}px`,
												height: `${cell.height}px`,
                                                fontSize: `${cell.fontSize}px`,
												color:
													table[floor][row][
														column
													] !== null
														? players[
																table[floor][
																	row
																][column]
														  ].color
														: null,
											}}
											id={
												floor * dimension * dimension +
												row * dimension +
												column
											}
											onClick={(event) =>
												onEachCellClick(event)
											}>
											{table[floor][row][column] !==
												null &&
												players[
													table[floor][row][column]
												].shape}
										</Button>
									))}
								</Row>
							))}
							<br />
						</Fragment>
					))
				) : (
					<p className="text-center"> در حال اتصال... </p>
				)}
			</Card.Body>
		</Card>
	);
};

export default TableDesign;
