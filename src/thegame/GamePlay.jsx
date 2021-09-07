import { Component } from "react";
import "./gamePlay.css";
import { toast } from "react-toastify";
import MainContext from "../common/MainContext";
import config from '../services/config.json';

class GamePlay extends Component {
    static contextType = MainContext;
    // **** noticed: gameplay needs a seperate layout
    //**** game resets on device change. fix it */
    // note: sidebars must change to ==> right-side: my-profile / left-side: opponent profile
    state = {
        rowMarginRatio: 0,
        players: [
            {
                shape: "X",
                color: "cyan",
                lineColor: "btn btn-primary",
                score: 0,
            },
            {
                shape: "O",
                color: "darkred",
                lineColor: "btn btn-danger",
                score: 0,
            },
        ], // maybe use player actual user name and change this item to an object of objects?
        turn: 0, // start turn is decided by throwning dices
        tableDimension: 4,
        table: [],
        yourTurn: -1
    };

    constructor() {
        super();
        this.cellButtons = [];
        this.socketConnection = this.connectToWS();
    }

    connectToWS = () => {
        let wsConnection = new WebSocket(config.webSocketRoot);
        wsConnection.onopen = () => {
            // wsConnection.send("Client connected to WebSocket");
        };

        wsConnection.onerror = (error) => {
            console.log(`WebSocket error: ${error}`);
        };

        wsConnection.onmessage = (e) => {
            const {yourTurn, tableDimension} = this.state;
            // catch exceptions
            if(yourTurn === -1){
                this.setState({yourTurn: Number(e.data)});
                return;
            }
            
            const cellID = Number(e.data);
            const cell = this.getCellCoordinates(cellID, tableDimension);
            this.verifyAndApplyTheMove(cell, this.cellButtons[cellID]);
        };

        wsConnection.onclose = () => {
            wsConnection = null;
        };
        return wsConnection;
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

    componentDidMount() {
        this.cellButtons = document.getElementsByClassName("gameTableCells"); // pay attension to searched className! may cause an error
        // init this.state.table array
        const { tableDimension } = this.state;
        let dimens = [];
        for (let i = 0; i < tableDimension; i++) dimens.push(i);
        let tempTable = dimens.map((floor) =>
            dimens.map((row) => dimens.map((column) => null))
        );
        this.setState({ table: tempTable });

        let divTableBlock = document.getElementById("divTableBlock");
        this.updateMarginParameters(divTableBlock);
        divTableBlock.addEventListener("resize", (event) =>
            this.onTableBlockResize(event)
        );
    }

    render() {
        return (
            <div id="divTableBlock" className="card border-dark gameBorderCard">
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
        const { tableDimension } = this.state;
        const selectedCellButton = event.target;

        if(this.state.turn !== this.state.yourTurn) return;

        const cell = this.getCellCoordinates(
            selectedCellButton.id,
            tableDimension
        );

        this.verifyAndApplyTheMove(cell, selectedCellButton);
        //send move to WebSocket Server
        this.socketConnection.send(
            `${selectedCellButton.id}`
        );
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
            this.inspectTableAroundTheCell(cell.floor, cell.row, cell.column);

        }
    };
    inspectTableAroundTheCell = (floor, row, column) => {
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
        let wholePoint =
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
        if (wholePoint) {
            let tempPlayers = [...players];
            tempPlayers[playerInTheCell].score += wholePoint;
            this.setState({ players: tempPlayers });
            //temp result show:

            if (playerInTheCell === 0)
                toast.info(
                    players[playerInTheCell].shape +
                        " : " +
                        players[playerInTheCell].score,
                    { position: "top-right" }
                );
            else
                toast.error(
                    players[playerInTheCell].shape +
                        " : " +
                        players[playerInTheCell].score,
                    { position: "bottom-left" }
                );
        }
    };

    // method below: checks each possible line(according to the condition that user gives it),
    // if the line is made colorifies the line and returns 1 ( as one single score for each line checked ), otherwise returns 0
    connectTheScoreLines = (count, firstCell, step, player, dimension) => {
        if (count === dimension) {
            for (let i = 0; i < dimension; i++) {
                this.cellButtons[firstCell + i * step].className =
                    "gameTableCells " + player.lineColor;
            }
            return 1;
        }
        return 0;
    };

    drawGameTable = () => {
        // *****************note: when window size changes: table's selected cells are cleared
        // use this.state.table to load again*****************
        const { rowMarginRatio, tableDimension } = this.state;
        // initialize rows columns floors

        let dimens = [];
        for (let i = 0; i < tableDimension; i++) dimens.push(i);

        // drawing the table and setting id s and click events
        return dimens.map((floor) => (
            <div>
                {dimens.map((row) => (
                    <div style={{ marginLeft: `${row * rowMarginRatio}px` }}>
                        {dimens.map((column) => (
                            <button
                                type="button"
                                className="gameTableCells btn btn-outline-dark"
                                id={
                                    floor * tableDimension * tableDimension +
                                    row * tableDimension +
                                    column
                                }
                                onClick={(event) => this.onEachCellClick(event)}
                            >
                                {" "}
                            </button>
                        ))}
                    </div>
                ))}
                <br />
            </div>
        ));
    };
}

export default GamePlay;
