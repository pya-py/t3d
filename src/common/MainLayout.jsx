import { ToastContainer } from "react-toastify";
import NavigationBar from "./NavigationBar";
import SignInSideBar from "./../sidebars/SignInSideBar";
import NoticeSideBar from "../sidebars/NoticeSideBar";
import { withRouter } from "react-router";
import { useMediaQuery } from "react-responsive";
import SmartPhoneNavigationBar from "./SmartPhoneNavigationBar";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadMe } from "../dashboard/actions";
import { Fragment } from "react";
import userServices from "./../services/userServices";
import gameServices from "../services/gameServices";
import { Col, Container, Row } from "react-bootstrap";
import PanelMenu from "../users/controlpanel/PanelMenu";

const MainLayout = (props) => {
    const { pathname } = props.location;
    //redux
    const player = useSelector((state) => state.player);
    const opponent = useSelector((state) => state.opponent);
    const scoreboard = useSelector((state) => state.scoreboard);

    const dispatch = useDispatch();

    const deviceIsDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
    const deviceIsSmartPhone = useMediaQuery({ query: "(max-width: 768px)" });
    const deviceIsTablet =
        !deviceIsDesktop && !deviceIsSmartPhone ? true : false;
    // this method is for temporary use and for finding items that cause horizontal overflow causing horizontal scrollbar
    // const findHorizontalOverflow = () => {
    //     let docWidth = document.documentElement.offsetWidth;
    //     [].forEach.call(document.querySelectorAll("*"), function (el) {
    //         if (el.offsetWidth > docWidth) {
    //             console.log("here is the sabotage: ", el);
    //         }
    //     });
    // };

    //load player data after sign in
    const userID = userServices.readUserID();
    if (userID && !player) {
        gameServices
            .loadPlayerData(userID)
            .then((result) => {
                dispatch(LoadMe(result ? result : null));
            })
            .catch((err) => {
                dispatch(LoadMe(null));
            });
    }

    let pageLeftSideBar = <NoticeSideBar />;
    let pageRightSideBar = player ? (
        <PlayerInfoSideBar player={player} inGame={scoreboard.me} />
    ) : (
        <SignInSideBar />
    ); // in case login hassnt been made

    if (pathname === "/signUp")
        pageLeftSideBar = pageRightSideBar = null;

    else if( pathname === "/controlPanel"){
        pageLeftSideBar = null;
        pageRightSideBar = <PanelMenu />;
    }
    else if (pathname === "/gameDeck") {
        // left sidebar must be opponents playerInfo
        if (opponent) {
            pageLeftSideBar = (
                <PlayerInfoSideBar player={opponent} inGame={scoreboard.opp} />
            );
        }
        if (deviceIsSmartPhone) {
            //this is temprory
            // find a way for showing result in smartphone, without causing vertical scroll
            pageLeftSideBar = null; //change later
            pageRightSideBar = null; // change then
        }
    }

    // *******create independent components for each device****
    return (
        <Fragment>
            <ToastContainer />
            {deviceIsDesktop || deviceIsTablet ? (
                <NavigationBar />
            ) : (
                <SmartPhoneNavigationBar />
            )}

            {/* wrap up this shit in
multiple components for each device design
this looks like shit khodayi */}
            {deviceIsDesktop && (
                <Row className="w-100 mx-auto">
                    <Col xs={3}>{pageRightSideBar}</Col>
                    <Col xs={pathname !== "/controlPanel" ? 6 : 9}>{props.children}</Col>
                    <Col xs={3}>{pageLeftSideBar}</Col>
                </Row>
            )}
            {deviceIsTablet && (
                <Row className="w-100 mx-auto">
                    {pathname === '/controlPanel' && <Col xs={4}>{pageRightSideBar}</Col>}
                    <Col className="mx-auto" xs={8}>
                        {props.children}
                    </Col>
                    {pageLeftSideBar && <Col xs={4}>{pageLeftSideBar}</Col>}
                </Row>
            )}
            {deviceIsSmartPhone && (
                <Container>
                    {/* what to do for control panelk sidebar in smartphone */}
                    {player ? (
                        <Row className="w-100 mx-auto">{pageRightSideBar}</Row>
                    ) : null}
                    <Row className="w-100 mx-auto">{pageLeftSideBar}</Row>
                    <Row className="w-100 mx-auto">{props.children}</Row>
                </Container>
            )}
        </Fragment>
    );
};

export default withRouter(MainLayout);
