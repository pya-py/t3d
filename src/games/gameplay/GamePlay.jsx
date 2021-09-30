import { Component } from "react";
import "../games.css";
import { toast } from "react-toastify";
import gameServices from "../../services/http/gameServices";
import gamePlaySocketServices from "../../services/ws/gamePlaySocketServices";
import withReduxDashboard from "../../dashboard/withReduxDashboard";
import { withRouter } from "react-router";
import TableDesign from "./TableDesign";
import { GameSetting } from "../../services/configs";

class GamePlay extends Component {
    //**** game resets on device change. fix it */
    state = {
        players: [
            {
                // ID: '',
                shape: <i className="fa fa-times" aria-hidden="true" />, // "X" : some device may not support font-awsome
                color: "blue",
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
        socketGamePlay: undefined,
        playerOnline: true,
        timeRemaining: 0, //create a config
        timerID: null
    };

    constructor() {
        super();
        this.connectionLost = false;
        this.cellButtons = [];
    }

    LoadOpponentData = (opponentID) => {
        const { opponent, LoadOpponent } = this.props;
        if (!opponent && opponentID) {
            gameServices
                .loadPlayerData(opponentID)
                .then((result) => {
                    LoadOpponent(result ? result : null);
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

    enableTimerForMe = () => {
        this.setState({ timeRemaining: GameSetting.T3D.MovesTimeOut });
        //is it needed to declare timerID as state?
        const timerID = setInterval(() => {
            const { timeRemaining, timerID } = this.state;
            if (timeRemaining <= 0) {
                clearInterval(timerID);
                return;
            }
            this.setState({ timeRemaining: this.state.timeRemaining - 1 });
        }, 1000);
        this.setState({timerID});
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
            const { players } = this.state;
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
            const { nextMove, turn, cell, xScore, oScore } = msg; //is table needed to be sent every time to clients?

            const cellID = Number(nextMove);

            //*************** */
            //is this needed to check the move in client? considering that complete check has been made in client
            //and consder that: checking move in client may cause some bugs
            //for ex: new move is sent -> and 'cause of some error the cell is not empty
            //turn is not updated and this player can not make new moves to recieve server's table!!!
            this.verifyAndApplyTheMove(cell, this.cellButtons[cellID]);
            //wrap it up this part of UPDATE and LOAD in a method
            const players = [...this.state.players];
            players[0].score = xScore;
            players[1].score = oScore;
            this.setState({
                players,
                turn,
            });
            this.cellButtons[cellID].focus();
            this.updateGameScorebaord();

            // now inform the server that the move is recieved
            //force connect it?
            this.state.socketGamePlay.send(
                gamePlaySocketServices.createSocketRequest(
                    "move_recieved",
                    room.name,
                    player.userID,
                    true
                )
            );
            // server time out is set and now setInterval for this client to show how much time left
            this.enableTimerForMe();
        } else if (command === "MOVE_MISSED") {
            const { myTurn } = this.state;
            const { player, room } = this.props;
            //msg --> forced set turn
            this.setState({ turn: msg });
            if (msg === myTurn) {
                //send a move_recieved request to inform the server to set the new timeout
                //force connect it?
                this.state.socketGamePlay.send(
                    gamePlaySocketServices.createSocketRequest(
                        "move_recieved",
                        room.name,
                        player.userID,
                        true
                    )
                );
                this.enableTimerForMe();
            }
        } else if (command === "END") {
            this.endGame();
        }
    };

    forceConnectToWebSocket = async (nextJob) => {
        const { player, room } = this.props;

        try {
            let socket = await gamePlaySocketServices.connect(
                room.name,
                player.userID,
                room.type
            );
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
                    this.forceConnectToWebSocket(nextJob);
                },
                nextJob ? 1000 : 3000
            );
            //if there is a next job --> then player is sending a move or something important and
            //time out needs to be called quicker 'cause players have timeout in server for sending moves
        }
    };

    initiateGameTimer = () => {
        setInterval(() => {
            if (window.navigator.onLine) {
                if (!this.state.playerOnline) {
                    //player JUST became online
                    console.log("connected");
                    this.setState({ playerOnline: true }); // toggle online status
                    this.forceConnectToWebSocket(null); // reconnect to gamePlayWebSocket
                }
            } else if (this.state.playerOnline) {
                //player JUST became offline
                console.log("dissconnected");
                this.setState({ playerOnline: false });
            }
        }, 2500); //2.5 sec is it ok?
    };

    componentDidMount() {
        this.cellButtons = document.getElementsByClassName("gameTableCells"); // pay attension to searched className! may cause an error

        const { player, room } = this.props;
        console.log();
        this.setState({ dimension: room.type });

        this.forceConnectToWebSocket(() => {
            this.state.socketGamePlay.send(
                gamePlaySocketServices.createSocketRequest(
                    "load",
                    room.name,
                    player.userID,
                    null
                )
            );
        });

        console.log("TOO MANY UNNEEDED PROPS SENT: ", this.props);
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
        const { dimension, turn, timerID } = this.state;
        const { player, opponent, room } = this.props;
        
        if (opponent) {
            try {
                const selectedCellButton = event.target;

                //this is just for when the connection is not automatically came back, so the user via clicking cells can initiate connection
                if (this.state.turn !== this.state.myTurn) {//is this needed really?
                    this.forceConnectToWebSocket(null);
                    return;
                }

                const cell = this.getCellCoordinates(
                    selectedCellButton.id,
                    dimension
                );

                if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
                    //send move to WebSocket Server
                    
                    this.setState({ turn: (turn + 1) % 2 });
                    this.forceConnectToWebSocket(() => {
                        this.state.socketGamePlay.send(
                            gamePlaySocketServices.createSocketRequest(
                                "move",
                                room.name,
                                player.userID,
                                selectedCellButton.id
                            )
                        );
                        this.state.socketGamePlay.send(
                            gamePlaySocketServices.createSocketRequest(
                                "load",
                                room.name,
                                player.userID,
                                null
                            )
                        );
                    });
                    clearInterval(timerID);
                    this.setState({timeRemaining: 0});
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
            this.setState({ table: tempTable });
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
        //ADD TRY CATCHimport gamePlaySocketServices from './../services/gamePlaySocketServices';
        //*************edit: this.context.gatherPlayerData();پ
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

    render() {
        return (
            <TableDesign
                dimension={this.state.dimension}
                players={this.state.players}
                table={this.state.table}
                timeRemaining={this.state.timeRemaining}
                onEachCellClick={this.onEachCellClick}
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
