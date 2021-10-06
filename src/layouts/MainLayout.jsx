import SignInSideBar from "../sidebars/SignInSideBar";
import NoticeSideBar from "../sidebars/NoticeSideBar";
import { withRouter } from "react-router";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useSelector } from "react-redux";
import { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GlobalSocketManager from "../services/ws/GlobalSocketManager";
import { Devices, Routes } from "../services/configs";
import AutoSignIn from '../tools/AutoSignIn';
import GlobalContext from "../globals/state/GlobalContext";


const MainLayout = (props) => {
    const context = useContext(GlobalContext)
    const { pathname } = props.location;
    //redux
    const player = useSelector((state) => state.player);
    const opponent = useSelector((state) => state.opponent);
    const scoreboard = useSelector((state) => state.scoreboard);

    const [leftSideBar, setLeftSideBar] = useState(null);
    const [rightSideBar, setRightSideBar] = useState(null);
    console.log(context);
    useEffect(() => {
        setLeftSideBar(<NoticeSideBar />);
    }, []);

    //teste
    //determine sidebar
    useEffect(() => {
        console.log("context.device responsive manager called");
        const setPrimaryRightSideBar = () => {
            if (context.device !== Devices.Tablet)
                setRightSideBar(
                    player ? (
                        <PlayerInfoSideBar inGame={scoreboard.me} />
                    ) : (
                        <SignInSideBar />
                    )
                );
            else setRightSideBar(null);
        };
        if (pathname === Routes.Client.SignUp) {
            setRightSideBar(null);
            setLeftSideBar(null);
        } else if (pathname === Routes.Client.GameDeck) {
            // EDIT THIS..
            // ON REFRESH -> rightSideBar is null!
            // SOMETIMES: ERROR: cannout read .fullname of undefined person
            setPrimaryRightSideBar();
            if (opponent) {
                if (context.device !== Devices.SmartPhone) {
                    setLeftSideBar(
                        <PlayerInfoSideBar
                            person={opponent}
                            inGame={scoreboard.opp}
                        />
                    );
                } else {
                    setLeftSideBar(null);
                    setRightSideBar(null);
                }
            }
        } else {
            setLeftSideBar(<NoticeSideBar />); //EDIT THIS
            setPrimaryRightSideBar();
        }
    }, [player, opponent, pathname, scoreboard, context.device]);

    return (
        <Fragment>
            <AutoSignIn />
            {player && <GlobalSocketManager />}

            {context.device !== Devices.SmartPhone ? (
                <Row className="w-100 mx-auto">
                    {rightSideBar && <Col xs={3}>{rightSideBar}</Col>}
                    <Col
                        className="mx-auto"
                        xs={pathname !== Routes.Client.SignUp ? null : 7}>
                        {props.children}
                    </Col>
                    {leftSideBar && (
                        <Col xs={context.device !== Devices.Tablet ? 3 : 4}>
                            {leftSideBar}
                        </Col>
                    )}
                </Row>
            ) : (
                <Container>
                    {/* what to do for control panelk sidebar in smartphone */}
                    {player ? (
                        <Row className="w-100 mx-auto">{rightSideBar}</Row>
                    ) : null}
                    <Row className="w-100 mx-auto">{leftSideBar}</Row>
                    <Row className="w-100 mx-auto">{props.children}</Row>
                </Container>
            )}
        </Fragment>
    );
};

export default withRouter(MainLayout);
