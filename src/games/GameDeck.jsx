import GamePlay from "./gameplay/GamePlay";
import { useSelector } from "react-redux";
import SingleGame from "./SingleGame";
import { Tab, Tabs, Card, Fade } from "react-bootstrap";
import { Fragment } from "react";
import CompetitionsMain from "./competitions/CompetitionsMain";

const GameDeck = () => {
    const room = useSelector((state) => state.room);

    return (
        <Fragment>
            {room.name ? (
                <GamePlay />
            ) : (
                <Card
                    border="secondary"
                    bg="transparent"
                    className="game-deck-card">
                    <Card.Body>
                        <Tabs
                            defaultActiveKey="randomGame"
                            transition={false}
                            variant="pills"
                            // transition={Fade}
                            className="mb-3">
                            
                            <Tab eventKey="randomGame" title="بازی تصادفی">
                                <SingleGame friendlyGame={false} />
                            </Tab>
                            <Tab eventKey="competitions" title="مسابقات">
                                <CompetitionsMain />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            )}
        </Fragment>
    );
};

export default GameDeck;
