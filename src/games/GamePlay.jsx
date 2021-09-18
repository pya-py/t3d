import { Component, Fragment } from "react";
import "./games.css";
import { toast } from "react-toastify";
import MainContext from "../common/contexts/MainContext";
import userServices from "./../services/userServices";
import gameServices from "./../services/gameServices";
import socketServices from "../services/socketServices";

class GamePlay extends Component {
    static contextType = MainContext;
    // **** noticed: gameplay needs a seperate layout
    //**** game resets on device change. fix it */
    // note: sidebars must change to ==> right-side: my-profile / left-side: opponent profile
    state = {
        forceConnectTriggerIsNeeded: false,
        rowMarginRatio: 0,
        players: [
            {
                // ID: '',
                shape: "X",
                color: "cyan",
                lineColor: "btn btn-primary",
                score: 0,
            },
            {
                // ID: '',
                shape: "O",
                color: "darkred",
                lineColor: "btn btn-danger",
                score: 0,
            },
        ], // maybe use player actual user name and change this item to an object of objects?
        turn: 0, // start turn is decided by throwning dices
        tableDimension: 4,
        table: null,
        yourTurn: undefined, // change this
        opponentID: null,
        gameID: null,
    };

    constructor() {
        super();
        this.connectionLost = false;
        this.cellButtons = [];
        this.socketConnection = undefined;
    }

    socketOnMessage = (response) => {
        const { data } = response;
        const { command, msg } = JSON.parse(data);
        if (command === "SET_TURN") {
            this.setState({ yourTurn: Number(msg) });
        } else if (command === "START") {
            const { yourTurn } = this.state;
            const opponentIndex = Number(!yourTurn);
            this.setState({ opponentID: msg[opponentIndex] });

            // toast.info("هر دو بازیکن متصل شدند");
            // if (this.state.yourTurn === this.state.turn)
            //     toast.warn("شروع حرکت با شما");
            // edit this part, code is temp
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
        } else if (command === "UPDATE") {
            const { roomName } = this.props;
            const { player } = this.context;
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

            this.socketConnection.send(
                socketServices.createSocketRequest(
                    "moveRecieved",
                    roomName,
                    player.userID,
                    true
                )
            );
            this.verifyAndApplyTheMove(cell, this.cellButtons[cellID]);
            this.cellButtons[cellID].focus();
        } else if (command === "END") {
            this.endGame();
        }
    };

    forceConnectToWebSocket = async (nextJob) => {
        const { roomName } = this.props;
        const { player } = this.context;
        try {
            this.socketConnection = await socketServices.connect(
                roomName,
                player.userID,
                this.state.tableDimension
            );
            this.socketConnection.onmessage = this.socketOnMessage;
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
            /*this.isOnline(
                () => {
                    if (this.connectionLost) {
                        console.log("connected");
                        this.connectionLost = false;
                        this.forceConnectToWebSocket(null);
                    }
                },
                () => {
                    console.log("dissconnected");
                    this.connectionLost = true;
                }
            );*/
        }, 1000);
    };

    /*    isOnline = (success, failure) => {
        var xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject("Microsoft.XMLHttp");
        xhr.onload = function () {
            if (success instanceof Function) {
                success();
            }
        };
        xhr.onerror = function () {
            if (failure instanceof Function) {
                failure();
            }
        };
         xhr.open("GET", "https://t3dweb.herokuapp.com/users", true);//edit this ******************************
         xhr.send();
    }; */

    componentDidMount() {
        this.cellButtons = document.getElementsByClassName("gameTableCells"); // pay attension to searched className! may cause an error

        let divTableBlock = document.getElementById("divTableBlock");
        this.updateMarginParameters(divTableBlock);
        divTableBlock.addEventListener("resize", (event) =>
            this.onTableBlockResize(event)
        );
        const { player } = this.context;
        const { roomName } = this.props;
        this.forceConnectToWebSocket(() => {
            this.socketConnection.send(
                socketServices.createSocketRequest(
                    "load",
                    roomName,
                    player.userID,
                    null
                )
            );
        });
        this.initiateGameTimer();
    }

    render() {
        return (
            <div id="divTableBlock" className="card border-dark gameBorderCard">
                <div className="form-inline w-100">
                    <p
                        style={{ color: this.state.players[1].color }}
                        className="w-50 text-center">{`O: ${this.state.players[1].score}`}</p>
                    <p
                        style={{ color: this.state.players[0].color }}
                        className="w-50 text-center">{`X: ${this.state.players[0].score}`}</p>
                </div>
                {this.drawGameTable()}
            </div>
        );
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
        const { opponentID, tableDimension } = this.state;
        const { roomName } = this.props;
        const { player } = this.context;
        if (opponentID) {
            try {
                const selectedCellButton = event.target;

                if (this.state.turn !== this.state.yourTurn) {
                    this.forceConnectToWebSocket(null);
                    return;
                }

                const cell = this.getCellCoordinates(
                    selectedCellButton.id,
                    tableDimension
                );

                if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
                    //send move to WebSocket Server
                    this.forceConnectToWebSocket(() => {
                        this.socketConnection.send(
                            socketServices.createSocketRequest(
                                "move",
                                roomName,
                                player.userID,
                                selectedCellButton.id
                            )
                        );
                        this.socketConnection.send(
                            socketServices.createSocketRequest(
                                "load",
                                roomName,
                                player.userID,
                                null
                            )
                        );
                    });
                }

                // this.socketConnection.send(
                //     socketServices.createSocketRequest(
                //         "load",
                //         roomName,
                //         player.userID,
                //         null
                //     )
                // );
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
            cellButton.innerHTML = players[turn].shape;
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
        const { players, table, tableDimension } = this.state;
        const playerInTheCell = table[floor][row][column];
        let rowCount = 0,
            columnCount = 0,
            floorMainDiagCount = 0,
            floorSideDiagCount = 0;
        let tableMainDiagCount = 0,
            tableSideDiagCount = 0,
            tableAltitudeCount = 0;
        for (let i = 0; i < tableDimension; i++) {
            if (table[floor][row][i] === playerInTheCell) rowCount++; // inspect in a row
            if (table[floor][i][column] === playerInTheCell) columnCount++; // inspect in a column
            if (table[i][row][column] === playerInTheCell) tableAltitudeCount++; // inspect in a altitude line
            if (row === column) {
                if (table[floor][i][i] === playerInTheCell)
                    floorMainDiagCount++; // inspect in a 2D main diagonal line through the cell's floor
                if (row === floor && table[i][i][i] === playerInTheCell)
                    tableMainDiagCount++; // inspect in a 3D main diagonal line through the whole table
            }
            if (row + column + 1 === tableDimension) {
                if (table[floor][i][tableDimension - i - 1] === playerInTheCell)
                    floorSideDiagCount++; // inpect in a 2D side Diagonal line through the cell's floor
                if (
                    row === floor &&
                    table[i][i][tableDimension - i - 1] === playerInTheCell
                )
                    tableSideDiagCount++; // inspect in a 3D side diagonal line through the whole table
            }
        }

        // now inspect wether a line has been made and take action for it
        let totalScores =
            this.connectTheScoreLines(
                rowCount,
                floor * tableDimension * tableDimension + row * tableDimension,
                1,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                columnCount,
                floor * tableDimension * tableDimension + column,
                tableDimension,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                floorMainDiagCount,
                floor * tableDimension * tableDimension,
                tableDimension + 1,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                floorSideDiagCount,
                floor * tableDimension * tableDimension + (tableDimension - 1),
                tableDimension - 1,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                tableMainDiagCount,
                0,
                tableDimension * (tableDimension + 1) + 1,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                tableSideDiagCount,
                tableDimension - 1,
                tableDimension * (tableDimension + 1) - 1,
                players[playerInTheCell],
                tableDimension
            ) +
            this.connectTheScoreLines(
                tableAltitudeCount,
                row * tableDimension + column,
                tableDimension * tableDimension,
                players[playerInTheCell],
                tableDimension
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

            return 1;
        }
        return 0;
    };

    endGame = async () => {
        //*******************important:
        //ADD TRY CATCHimport socketServices from './../services/socketServices';

        const { players, yourTurn, opponentID } = this.state;
        const { userID } = this.context.player;
        const opponent = Number(!yourTurn); // you: 1 => opponent: 0, you: 0 => opponent: 1
        const deltaPoints = players[yourTurn].score - players[opponent].score; // difference between players points
        const givenPoints = deltaPoints > 0 ? 3 : Number(!deltaPoints); // 3 for win, 1 for draw, 0 for lose
        await userServices.updateRecords(userID, givenPoints);
        this.context.gatherPlayerData();

        //temp: fuck clients: winner must be decided in the server
        toast.success("GAME ENDED");
        toast.warn(`YOU ACHIEVED ${givenPoints} POINTS`);
        // toast for telling the edn result
        // x (yourTurn===0) always saves the game result
        if (!yourTurn) {
            await gameServices.saveGame({
                xID: userID,
                oID: opponentID,
                xScores: players[0].score,
                oScores: players[1].score,
                isLive: false,
            });
            //toast for saving succefully
        }
    };
    drawGameTable = () => {
        // *****************note: when window size changes: table's selected cells are cleared
        // use this.state.table to load again*****************
        const { rowMarginRatio, tableDimension } = this.state;
        // initialize rows columns floors

        try {
            if (!this.state.table) {
                return "waiting";
            } else {
                console.table(this.state.table);
                let dimens = [];
                for (let i = 0; i < tableDimension; i++) dimens.push(i);
                const { table, players } = this.state;
                // drawing the table and setting id s and click events
                return dimens.map((floor) => (
                    <Fragment>
                        {dimens.map((row) => (
                            <div
                                style={{
                                    marginLeft: `${row * rowMarginRatio}px`,
                                }}>
                                {dimens.map((column) => (
                                    <button
                                        key={
                                            floor *
                                                tableDimension *
                                                tableDimension +
                                            row * tableDimension +
                                            column
                                        }
                                        type="button"
                                        className="gameTableCells btn btn-outline-dark"
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
                                            floor *
                                                tableDimension *
                                                tableDimension +
                                            row * tableDimension +
                                            column
                                        }
                                        onClick={(event) =>
                                            this.onEachCellClick(event)
                                        }>
                                        {table[floor][row][column] !== null &&
                                            players[table[floor][row][column]]
                                                .shape}
                                    </button>
                                ))}
                            </div>
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

export default GamePlay;
