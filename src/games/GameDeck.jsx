import GamePlay from "./GamePlay";
import { useSelector } from "react-redux";
import SingleGame from "./SignleGame";
import { Tab, Tabs, Card, Fade } from "react-bootstrap";
import { Fragment } from "react";

const GameDeck = () => {
    const room = useSelector((state) => state.room);

    return (
        <Fragment>
            {room ? (
                <GamePlay />
            ) : (
                <Card
                    border="secondary"
                    bg="transparent"
                    className="gameDeckCard">
                    <Card.Body>
                        <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="noanim-tab-example"
                            variant="pills"
                            // transition={Fade}
                            className="mb-3">
                            
                            <Tab eventKey="profile" title="بازی تصادفی">
                                <SingleGame friendlyGame={false} />
                            </Tab>
                            <Tab eventKey="contact" title="مسابقات"></Tab>
                            <Tab eventKey="home" title="بازی با دوستان">
                                <SingleGame friendlyGame={true} />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            )}
        </Fragment>
    );
};

export default GameDeck;
