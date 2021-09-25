import { Component, Fragment } from "react";
import "./games.css";
import { toast } from "react-toastify";
import gameServices from "./../services/gameServices";
import socketServices from "../services/socketServices";
import withReduxDashboard from "../dashboard/withReduxDashboard";
import { withRouter } from "react-router";
import { Button, Card, Row, Col } from "react-bootstrap";

class GamePlay extends Component {
    //**** game resets on device change. fix it */
    state = {
        rowMarginRatio: 0,
        players: [
            {
                // ID: '',
                shape: <i className="fa fa-times" aria-hidden="true" />, // "X" : some device may not support font-awsome
                color: "cyan",
                lineColor: "btn btn-primary",
                score: 0,
            },
            {
                // ID: '',
                shape: <i className="fa fa-sun-o" aria-hidden="true" />, // "O" : some device may not support font-awsome
                color: "darkred",
                lineColor: "btn btn-danger",
                score: 0,
            },
        ], // maybe use player actual user name and change this item to an object of objects?
        turn: 0, // start turn is decided by throwning dices
        dimension: 3,
        table: null,
        myTurn: undefined, // change this
        gameID: null,
        socketConnection: undefined,
    };

    constructor() {
        super();
        this.connectionLost = false;
        this.cellButtons = [];
    }

    render() {
        const { players } = this.state;
        return (
            <Card
                id="divTableBlock"
                bg="transparent"
                border="dark"
                className="w-100 mx-auto">
                <Card.Header className="w-100 text-center">
                    <Row>
                        <Col
                            style={{
                                fontSize: "20px",
                                textAlign: "right",
                                color: players[1].color,
                            }}>
                            {players[1].shape} : {players[1].score}
                        </Col>
                        <Col
                            style={{
                                fontSize: "20px",
                                textAlign: "left",
                                color: players[0].color,
                            }}>
                            {players[0].score} : {players[0].shape}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="gameBorderCard">
                    {this.drawGameTable()}
                </Card.Body>
            </Card>
        );
    }
    LoadOpponentData = (opponentID) => {
        const { opponent, LoadOpponent } = this.props;
        if (!opponent && opponentID) {
            gameServices
                .loadPlayerData(opponentID)
                .then((result) => {
                    LoadOpponent(result ? result : null);
                    toast.info("حریف شما هم به بازی متصل شد");
                    toast.warn(
                        "حرکت اول با: " +
                            (!this.state.myTurn ? "شما" : "حریف شما")
                    );
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
    socketOnMessage = (response) => {
        const { data } = response;
        const { command, msg } = JSON.parse(data);
        if (command === "SET_TURN") {
            this.setState({ myTurn: Number(msg) });
        } else if (command === "START") {
            const { myTurn } = this.state;
            const { IDs, gameType } = msg;
            const opponentIndex = Number(!myTurn);
            this.setState({ dimension: gameType });
            this.LoadOpponentData(IDs[opponentIndex]);
        } else if (command === "LOAD") {
            const { table, xScore, oScore, turn } = msg;
            const players = [...this.state.players];
            players[0].score = xScore;
            players[1].score = oScore;
            this.setState({
                table,
                players,
                turn,
            });
            this.updateGameScorebaord();
        } else if (command === "UPDATE") {
            const { player, room } = this.props;
            // toast.warn('new-move-recieved');
            //******** */ catch exceptions
            // ****** UPDATE THIS PART **************************************//
            const { newMove, cell, xScore, oScore } = msg; //is table needed to be sent every time to clients?

            const cellID = Number(newMove);

            //wrap it up this part of UPDATE and LOAD in a method
            const players = [...this.state.players];
            players[0].score = xScore;
            players[1].score = oScore;
            this.setState({
                players,
            });

            this.state.socketConnection.send(
                socketServices.createSocketRequest(
                    "moveRecieved",
                    room.name,
                    player.userID,
                    true
                )
            );
            this.verifyAndApplyTheMove(cell, this.cellButtons[cellID]);
            this.cellButtons[cellID].focus();
            this.updateGameScorebaord();
        } else if (command === "END") {
            this.endGame();
        }
    };

    forceConnectToWebSocket = async (nextJob) => {
        const { player, room } = this.props;

        try {
            let socket = await socketServices.connect(
                room.name,
                player.userID,
                room.type
            );
            socket.onmessage = this.socketOnMessage;
            this.setState({ socketConnection: socket });
            if (nextJob) nextJob();
        } catch (err) {
            console.log(err);

            setTimeout(() => {
                console.log("rconnecting from GamePlay");
                this.forceConnectToWebSocket(nextJob);
            }, 1000);
        }
    };

    updateMarginParameters = (divTableBlock) => {
        //const {deviceIsDesktop, deviceIsTablet, deviceIsSmartPhone} = this.context;
        const rowMarginDevideOn = 12.4; // deviceIsDesktop ? 22 : (deviceIsTablet ? 14 : 6);
        this.setState({
            rowMarginRatio: divTableBlock.offsetWidth / rowMarginDevideOn,
        });
        //*** for now this method remain still but if the main container is in fixed pixels width, the hell is this needed? */
    };

    onTableBlockResize = (event) => {
        this.updateMarginParameters(event.target);
    };

    initiateGameTimer = () => {
        setInterval(() => {
            if (window.navigator.onLine) {
                if (this.connectionLost) {
                    console.log("connected");
                    this.connectionLost = false;
                    this.forceConnectToWebSocket(null);
                }
            } else {
                console.log("dissconnected");
                this.connectionLost = true;
            }
        }, 1000);
    };

    componentDidMount() {
        this.cellButtons = document.getElementsByClassName("gameTableCells"); // pay attension to searched className! may cause an error

        let divTableBlock = document.getElementById("divTableBlock");
        this.updateMarginParameters(divTableBlock);
        divTableBlock.addEventListener("resize", (event) =>
            this.onTableBlockResize(event)
        );

        const { player, room } = this.props;
        this.setState({ dimension: room.type });

        this.forceConnectToWebSocket(() => {
            this.state.socketConnection.send(
                socketServices.createSocketRequest(
                    "load",
                    room.name,
                    player.userID,
                    null
                )
            );
        });
        this.initiateGameTimer();
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
        const { dimension } = this.state;
        const { player, opponent, room } = this.props;
        if (opponent) {
            try {
                const selectedCellButton = event.target;

                if (this.state.turn !== this.state.myTurn) {
                    this.forceConnectToWebSocket(null);
                    return;
                }

                const cell = this.getCellCoordinates(
                    selectedCellButton.id,
                    dimension
                );

                if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
                    //send move to WebSocket Server
                    this.forceConnectToWebSocket(() => {
                        this.state.socketConnection.send(
                            socketServices.createSocketRequest(
                                "move",
                                room.name,
                                player.userID,
                                selectedCellButton.id
                            )
                        );
                        this.state.socketConnection.send(
                            socketServices.createSocketRequest(
                                "load",
                                room.name,
                                player.userID,
                                null
                            )
                        );
                    });
                }
            } catch (err) {
                console.log(err);
                //load again here?
            }
        }
    };

    verifyAndApplyTheMove = (cell, cellButton) => {
        const { players, turn } = this.state;
        let tempTable = [...this.state.table];
        if (tempTable[cell.floor][cell.row][cell.column] === null) {
            tempTable[cell.floor][cell.row][cell.column] = turn; //maybe its better to use players actual Id huh?
            cellButton.value = players[turn].shape;
            cellButton.style.color = players[turn].color;
            this.setState({
                turn: (turn + 1) % 2,
                table: tempTable,
            });
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
        if (count === dimension) {
            for (let i = 0; i < dimension; i++) {
                this.cellButtons[firstCell + i * step].className =
                    "gameTableCells " + player.lineColor;
                setTimeout(() => {
                    this.cellButtons[firstCell + i * step].className =
                        "gameTableCells btn btn-outline-dark";
                }, 1000 + i * 100);
            }
        }
    };

    endGame = async () => {
        //*******************important:
        //ADD TRY CATCHimport socketServices from './../services/socketServices';
        //*************edit: this.context.gatherPlayerData();
        this.props.UpdateMyRecords(); //resets redux.state.player => forces MainLayout to reload player data and records

        const { players, myTurn } = this.state;
        const oppTurn = Number(!myTurn);
        if (players[myTurn].score > players[oppTurn].score)
            toast.success("شما برنده شدید و سه امتیاز کسب کردید");
        else if (players[myTurn].score === players[oppTurn].score)
            toast.info("شما مساوی شدید و یک امتیاز کسب کردید");
        else toast.error("تکبیر!");
        //reset everything:
        setTimeout(() => {
            this.props.CleanScoreboard();
            this.props.ResetOpponent();
            this.props.ResetRoom();
            this.props.TriggerRecordUpdate();
            this.props.history.replace("/"); // in competition mode must be send back to competition page
        }, 5000);
    };

    drawGameTable = () => {
        // *****************note: when window size changes: table's selected cells are cleared
        // use this.state.table to load again*****************
        const { rowMarginRatio, dimension } = this.state;
        // initialize rows columns floors

        try {
            if (!this.state.table) {
                return "...در حال اتصال";
            } else {
                let dimens = [];
                const leftMargins = [0, 40, 80, 120, 160];
                for (let i = 0; i < dimension; i++) dimens.push(i);
                const { table, players } = this.state;
                // drawing the table and setting id s and click events
                return dimens.map((floor) => (
                    <Fragment>
                        {dimens.map((row) => (
                            <Row
                                style={{
                                    direction: "ltr",
                                    marginLeft: `${leftMargins[row]}px`,
                                }}>
                                {dimens.map((column) => (
                                    <Button
                                        key={
                                            floor * dimension * dimension +
                                            row * dimension +
                                            column
                                        }
                                        variant="btn btn-outline-dark"
                                        className="gameTableCells"
                                        style={
                                            table[floor][row][column] !== null
                                                ? {
                                                      color: players[
                                                          table[floor][row][
                                                              column
                                                          ]
                                                      ].color,
                                                  }
                                                : null
                                        }
                                        id={
                                            floor * dimension * dimension +
                                            row * dimension +
                                            column
                                        }
                                        onClick={(event) =>
                                            this.onEachCellClick(event)
                                        }>
                                        {table[floor][row][column] !== null &&
                                            players[table[floor][row][column]]
                                                .shape}
                                    </Button>
                                ))}
                            </Row>
                        ))}
                        <br />
                    </Fragment>
                ));
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    };
}

export default withRouter(withReduxDashboard(GamePlay));

//another way to check online / offline status :
// initiateGameTimer = () => {
//     setInterval(() => {
//         if (window.navigator.onLine) {
//             if (this.connectionLost) {
//                 console.log("connected");
//                 this.connectionLost = false;
//                 this.forceConnectToWebSocket(null);
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
//                     this.forceConnectToWebSocket(null);
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
