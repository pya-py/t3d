import { Component } from "react";
import "../games.css";
import gameServices from "../../services/http/gameServices";
import {
	connect,
	createSocketRequest,
} from "../../services/ws/gamePlaySocketServices";
import withReduxDashboard from "../../globals/redux/withReduxDashboard";
import { withRouter } from "react-router";
import TableDesign from "./TableDesign";
import { GameSetting } from "../../services/configs";
import { Attention, Notify } from "../../tools/msgbox";
import { toTimeShort } from "../../tools/format";

class GamePlay extends Component {
	//**** game resets on device change. fix it */
	state = {
		normalCell: "outline-dark",
		players: [
			{
				// ID: '',
				shape: <i className="fa fa-times" aria-hidden="true" />, // "X" : some device may not support font-awsome
				color: "blue",
				selected: "warning",
				lineColor: "primary",
				score: 0,
			},
			{
				// ID: '',
				shape: <i className="fa fa-sun-o" aria-hidden="true" />, // "O" : some device may not support font-awsome
				color: "darkred",
				selected: "warning",
				lineColor: "danger",
				score: 0,
			},
		], // maybe use player actual user name and change this item to an object of objects?
		turn: 0, // start turn is decided by throwning dices
		dimension: 3,
		table: null,
		myTurn: undefined, // change this
		gameID: null,
		socketGamePlay: undefined,
		playerOnline: true,
		timeRemaining: 0, //create a config
		timerID: null,
		connectionCheckTimerID: null,
	};

	constructor() {
		super();
		this.cellButtons = [];
	}

	LoadOpponentData = (opponentID) => {
		const { opponent, LoadOpponent } = this.props;
		if (!opponent && opponentID) {
			gameServices
				.loadPlayerData(opponentID)
				.then((result) => {
					LoadOpponent(result ? result : null);
				})
				.catch((err) => {
					//console.log(err);
					LoadOpponent(null);
				});
		}
	};

	updateGameScorebaord = () => {
		const { myTurn, players } = this.state;
		const oppTurn = Number(!myTurn);

		this.props.UpdateScoreboard({
			me: {
				index: myTurn,
				shape: players[myTurn].shape,
				score: players[myTurn].score,
			},
			opp: {
				index: oppTurn,
				shape: players[oppTurn].shape,
				score: players[oppTurn].score,
			},
		});
	};

	enableTimerForMyMove = (timeout = GameSetting.T3D.TurnTimeOut) => {
		this.setState({ timeRemaining: timeout });
		//is it needed to declare timerID as state?
		const timerID = setInterval(() => {
			const { timeRemaining, timerID } = this.state;
			if (timeRemaining <= 0) {
				clearInterval(timerID);
				return;
			}
			this.setState({ timeRemaining: this.state.timeRemaining - 1 });
		}, 1000);
		this.setState({ timerID });
	};

	updatePlayerStates = ({ turn, xScore, oScore }) => {
		const players = [...this.state.players];
		players[0].score = xScore;
		players[1].score = oScore;
		this.setState({
			players,
			turn,
		});
		this.updateGameScorebaord();
	};

	disableAllTimers = () => {
		const { connectionCheckTimerID, timerID } = this.state;
		clearTimeout(connectionCheckTimerID);
		clearTimeout(timerID); //move time out timer
	};

	socketOnMessage = (response) => {
		const { data } = response;
		const { cmd, msg } = JSON.parse(data);
		if (cmd === "START") {
			const startTime = toTimeShort(msg);
			Attention(`بازی راس ساعت ${startTime} آغاز شد.`);
		} else if (cmd === "GAME") {
			const { IDs, dimension, myTurn } = msg;
			this.setState({ dimension, myTurn });
			const opponentIndex = Number(!myTurn);
			this.LoadOpponentData(IDs[opponentIndex]);
		} else if (cmd === "LOAD") {
			this.updatePlayerStates(msg);
			const { table } = msg;

			this.setState({
				table,
			});
			this.updateGameScorebaord();
		} else if (cmd === "TIMER") {
			//you can calculate request respone time -> then minimize it from tiem sent by server -> to gain acurate time
			//but its real neccessary, Math.floor on the server side does this nearly
			//but for accurate approach remember: remove Math.floor from server side
			console.log("time updated: ", msg);
			this.setState({ timeRemaining: msg });
			clearTimeout(this.state.timerID); //clear move time out timers, though their disabled before, this is for assurance
			this.enableTimerForMyMove(msg);
		} else if (cmd === "SCORES") this.updatePlayerStates(msg);
		else if (cmd === "UPDATE") {
			const { player, room } = this.props;
			const { dimension } = this.state;
			const cellID = Number(msg.nextMove);

			//*************** */
			//is this needed to check the move in client? considering that complete check has been made in client
			//and consder that: checking move in client may cause some bugs
			//for ex: new move is sent -> and 'cause of some error the cell is not empty
			//turn is not updated and this player can not make new moves to recieve server's table!!!
			this.verifyAndApplyTheMove(
				this.getCellCoordinates(cellID, dimension),
				this.cellButtons[cellID]
			);
			//wrap it up this part of UPDATE and LOAD in a method
			this.updatePlayerStates(msg);

			this.cellButtons[cellID].focus();
			this.updateGameScorebaord();

			// now inform the server that the move is recieved
			//force connect it?
			this.state.socketGamePlay.send(
				createSocketRequest(
					"move_recieved",
					room.name,
					player.userID,
					true
				)
			);
			// server time out is set and now setInterval for this client to show how much time left
			this.enableTimerForMyMove();
		} else if (cmd === "MOVE_MISSED") {
			const { myTurn } = this.state;
			//msg --> forced set turn
			this.setState({ turn: msg });
			if (msg === myTurn) this.enableTimerForMyMove();
		} else if (cmd === "END") {
			this.updatePlayerStates(msg);
			this.endThisGame();
			this.disableAllTimers();
		} else if (cmd === "CLOSE") {
			Attention(
				"بدلیل حاضر نبودن هیچ کدام از بازیکینان، بازی شما کنسل شد"
			);
			this.closeThisGame();
		} else {
			console.log("wrong socket request");
		}
	};

	forceConnectWS = async (nextJob) => {
		const { player, room } = this.props;

		try {
			let socket = await connect(room.name, player.userID, room.type);
			socket.onmessage = this.socketOnMessage;
			this.setState({ socketGamePlay: socket });
			if (nextJob) nextJob();
		} catch (err) {
			console.log(err);
			// **********************
			//time out must be set with rising time out time to prevent server getting fucked up
			setTimeout(
				() => {
					console.log("rconnecting from GamePlay");
					this.forceConnectWS(nextJob);
				},
				nextJob ? 1000 : 3000
			);
			//if there is a next job --> then player is sending a move or something important and
			//time out needs to be called quicker 'cause players have timeout in server for sending moves
		}
	};

	enableConnectionCheckTimer = () => {
		return setInterval(() => {
			if (window.navigator.onLine) {
				if (!this.state.playerOnline) {
					//player JUST became online
					console.log("connected");
					this.setState({ playerOnline: true }); // toggle online status
					this.forceConnectWS(null); // reconnect to gamePlayWebSocket
				}
			} else if (this.state.playerOnline) {
				//player JUST became offline
				console.log("dissconnected");
				this.setState({ playerOnline: false });
			}
		}, 2500); //2.5 sec is it ok?
	};

	componentDidMount() {
		this.cellButtons = document.getElementsByClassName("game-table-cells"); // pay attension to searched className! may cause an error

		const { player, room } = this.props;
		const { myTurn } = this.state;
		this.setState({ dimension: room.type });

		this.forceConnectWS(() => {
			this.state.socketGamePlay.send(
				createSocketRequest("load", room.name, player.userID, null)
			);
			this.state.socketGamePlay.send(
				createSocketRequest("mytimer", room.name, player.userID, myTurn)
			);
		});

		console.log("TOO MANY UNNEEDED PROPS SENT: ", this.props);
		this.setState({
			connectionCheckTimerID: this.enableConnectionCheckTimer(),
		});
	}

	componentWillUnmount() {
		this.disableAllTimers();
	}
	getCellCoordinates = (cellID, dimen) => {
		const cellFloor = Math.floor(cellID / (dimen * dimen));
		const onFloorId = cellID % (dimen * dimen);
		const cellRow = Math.floor(onFloorId / dimen);
		const cellColumn = onFloorId % dimen;
		// just test a random id to see how above formula works!
		return { floor: cellFloor, row: cellRow, column: cellColumn };
	};
	onEachCellClick = (event) => {
		const { dimension, turn, timerID } = this.state;
		const { player, opponent, room } = this.props;
		if (opponent) {
			try {
				const selectedCellButton = event.target;

				//this is just for when the connection is not automatically came back, so the user via clicking cells can initiate connection
				if (this.state.turn !== this.state.myTurn) {
					console.log(this.state.myTurn);
					//is this needed really?
					this.forceConnectWS(null);
					return;
				}

				const cell = this.getCellCoordinates(
					selectedCellButton.id,
					dimension
				);

				if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
					//send move to WebSocket Server

					this.setState({ turn: (turn + 1) % 2 });
					this.forceConnectWS(() => {
						this.state.socketGamePlay.send(
							createSocketRequest(
								"move",
								room.name,
								player.userID,
								selectedCellButton.id
							)
						);

						//load is not needed cause i updated server to send back new scores immediately
						/*this.state.socketGamePlay.send(
                            createSocketRequest(
                                "load",
                                room.name,
                                player.userID,
                                null
                            )
                        );*/
					});
					clearInterval(timerID);
					this.setState({ timeRemaining: 0 });
				}
			} catch (err) {
				console.log(err);
				//load again here?
			}
		}
	};

	verifyAndApplyTheMove = (cell, cellButton) => {
		const { players, turn, normalCell } = this.state;
		let tempTable = [...this.state.table];
		if (tempTable[cell.floor][cell.row][cell.column] === null) {
			tempTable[cell.floor][cell.row][cell.column] = turn; //maybe its better to use players actual Id huh?
			this.setState({ table: tempTable });
			// cellButton.value = players[turn].shape;
			// cellButton.style.color = players[turn].color;
			cellButton.className = `game-table-cells btn btn-${players[turn].selected}`;
            setTimeout(() => {cellButton.className = `game-table-cells btn btn-${normalCell}`;}, 1000);
			// time to inspect the new cell:
			this.inspectAreaAroundTheCell(cell.floor, cell.row, cell.column);

			return true;
		}
		return false;
	};

	inspectAreaAroundTheCell = (floor, row, column) => {
		// inpect the table in all ways around a selected cell (new selected one), to update points and color the score routes
		// is it needed to write a inspectAll method ?
		const { players, table, dimension } = this.state;
		const playerInTheCell = table[floor][row][column];
		let rowCount = 0,
			columnCount = 0,
			floorMainDiagCount = 0,
			floorSideDiagCount = 0;
		let tableMainDiagCount = 0,
			tableSideDiagCount = 0,
			tableAltitudeCount = 0;
		for (let i = 0; i < dimension; i++) {
			if (table[floor][row][i] === playerInTheCell) rowCount++; // inspect in a row
			if (table[floor][i][column] === playerInTheCell) columnCount++; // inspect in a column
			if (table[i][row][column] === playerInTheCell) tableAltitudeCount++; // inspect in a altitude line
			if (row === column) {
				if (table[floor][i][i] === playerInTheCell)
					floorMainDiagCount++; // inspect in a 2D main diagonal line through the cell's floor
				if (row === floor && table[i][i][i] === playerInTheCell)
					tableMainDiagCount++; // inspect in a 3D main diagonal line through the whole table
			}
			if (row + column + 1 === dimension) {
				if (table[floor][i][dimension - i - 1] === playerInTheCell)
					floorSideDiagCount++; // inpect in a 2D side Diagonal line through the cell's floor
				if (
					row === floor &&
					table[i][i][dimension - i - 1] === playerInTheCell
				)
					tableSideDiagCount++; // inspect in a 3D side diagonal line through the whole table
			}
		}

		// now inspect wether a line has been made and take action for it
		this.connectTheScoreLines(
			rowCount,
			floor * dimension * dimension + row * dimension,
			1,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			columnCount,
			floor * dimension * dimension + column,
			dimension,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			floorMainDiagCount,
			floor * dimension * dimension,
			dimension + 1,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			floorSideDiagCount,
			floor * dimension * dimension + (dimension - 1),
			dimension - 1,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			tableMainDiagCount,
			0,
			dimension * (dimension + 1) + 1,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			tableSideDiagCount,
			dimension - 1,
			dimension * (dimension + 1) - 1,
			players[playerInTheCell],
			dimension
		);
		this.connectTheScoreLines(
			tableAltitudeCount,
			row * dimension + column,
			dimension * dimension,
			players[playerInTheCell],
			dimension
		);
	};

	// method below: checks each possible line(according to the condition that user gives it),
	// if the line is made colorifies the line and returns 1 ( as one single score for each line checked ), otherwise returns 0
	connectTheScoreLines = (count, firstCell, step, player, dimension) => {
		const { normalCell } = this.state;
		if (count === dimension) {
			for (let i = 0; i < dimension; i++) {
				this.cellButtons[
					firstCell + i * step
				].className = `game-table-cells btn btn-${player.lineColor}`;
				setTimeout(() => {
					this.cellButtons[
						firstCell + i * step
					].className = `game-table-cells btn btn-${normalCell}`;
				}, 1000 + i * 100);
			}
		}
	};

	closeThisGame = () => {
		this.state.socketGamePlay.close();
		this.setState({ socketGamePlay: null });
		setTimeout(() => {
			this.props.CleanScoreboard();
			this.props.ResetOpponent();
			this.props.ResetRoom();
			this.props.TriggerRecordUpdate();
			this.props.history.replace("/"); // in competition mode must be send back to competition page
		}, 5000);
	};

	endThisGame = () => {
		const { players, myTurn } = this.state;
		const oppTurn = Number(!myTurn);
		//NOTE: u can deliver this message to socket global to make sure toast shows all the tie but its no need really :|
		if (players[myTurn].score > players[oppTurn].score)
			Notify("شما برنده شدید و سه امتیاز کسب کردید");
		else if (players[myTurn].score === players[oppTurn].score)
			Notify("شما مساوی شدید و یک امتیاز کسب کردید");
		else Notify("شما باختید");
		//reset everything:
		this.closeThisGame();
	};

	render() {
		return (
			<TableDesign
				dimension={this.state.dimension}
				players={this.state.players}
				table={this.state.table}
				timeRemaining={this.state.timeRemaining}
				onEachCellClick={this.onEachCellClick}
                normalCell={this.state.normalCell}
			/>
		);
	}
}

export default withRouter(withReduxDashboard(GamePlay));

//another way to check online / offline status :
// initiateGameTimer = () => {
//     setInterval(() => {
//         if (window.navigator.onLine) {
//             if (this.connectionLost) {
//                 console.log("connected");
//                 this.connectionLost = false;
//                 this.forceConnectWS(null);
//             }
//         } else {
//             console.log("dissconnected");
//             this.connectionLost = true;
//         }
//         /*this.isOnline(
//             () => {
//                 if (this.connectionLost) {
//                     console.log("connected");
//                     this.connectionLost = false;
//                     this.forceConnectWS(null);
//                 }
//             },
//             () => {
//                 console.log("dissconnected");
//                 this.connectionLost = true;
//             }
//         );*/
//     }, 1000);
// };

// /*    isOnline = (success, failure) => {
//     var xhr = XMLHttpRequest
//         ? new XMLHttpRequest()
//         : new window.ActiveXObject("Microsoft.XMLHttp");
//     xhr.onload = function () {
//         if (success instanceof Function) {
//             success();
//         }
//     };
//     xhr.onerror = function () {
//         if (failure instanceof Function) {
//             failure();
//         }
//     };
//      xhr.open("GET", "https://t3dweb.herokuapp.com/users", true);//edit this ******************************
//      xhr.send();
// }; */
