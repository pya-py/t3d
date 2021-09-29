import { Fragment } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { GameSetting } from "../services/configs";
import BriefScoreboard from "./BriefScoreboard";

const TableDesign = ({ dimension, players, table, onEachCellClick }) => {
    let dimens = [];
    for (let i = 0; i < dimension; i++) dimens.push(i);

    return (
        <Card
            id="divTableBlock"
            bg="transparent"
            border="dark"
            className="w-100 mx-auto">
            <BriefScoreboard players={players} />
            <Card.Body className="gameBorderCard">
                {table ? (
                    dimens.map((floor) => (
                        <Fragment>
                            {dimens.map((row) => (
                                <Row
                                    style={{
                                        direction: "ltr",
                                        marginLeft: `${GameSetting.TableRowMargings[row]}px`,
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
                    <p> در حال اتصال... </p>
                )}
            </Card.Body>
        </Card>
    );
};

export default TableDesign;
