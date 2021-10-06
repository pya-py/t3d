import { Fragment } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { GameSetting } from "../../services/configs";
import BriefScoreboard from "./BriefScoreboard";
import "../games.css";

const TableDesign = ({ timeRemaining, dimension, players, table, onEachCellClick,normalCell }) => {
    let dimens = [];
    for (let i = 0; i < dimension; i++) dimens.push(i);

    //prop drilling in BriefScoreBoard
    return (
        <Card
            bg="transparent"
            border="dark"
            className="w-100 mx-auto">
            <BriefScoreboard timeRemaining={timeRemaining} players={players} />
            <Card.Body className="game-border-card">
                {table ? (
                    dimens.map((floor) => (
                        <Fragment>
                            {dimens.map((row) => (
                                <Row
                                    style={{
                                        direction: "ltr",
                                        marginLeft: `${GameSetting.T3D.TableRowMargings[row]}px`,
                                    }}>
                                    {dimens.map((column) => (
                                        <Button
                                            key={
                                                floor * dimension * dimension +
                                                row * dimension +
                                                column
                                            }
                                            variant={normalCell}
                                            className="game-table-cells"
                                            style={
                                                table[floor][row][column] !==
                                                null
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
