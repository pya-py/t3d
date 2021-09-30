import { ToastContainer } from "react-toastify";
import NavigationBar from "./NavigationBar";
import SignInSideBar from "./../sidebars/SignInSideBar";
import NoticeSideBar from "../sidebars/NoticeSideBar";
import { withRouter } from "react-router";
import { useMediaQuery } from "react-responsive";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadMe, SetDeviceType, SignOut, UpdateMyRecords } from "../dashboard/actions";
import { Fragment } from "react";
import userServices from "../services/http/userServices";
import gameServices from "../services/http/gameServices";
import { Col, Container, Row } from "react-bootstrap";
import ProfilePanel from "../profile/ProfilePanel";
import { useEffect } from "react";
import GlobalSocketManager from "../services/ws/GlobalSocketManager";
import {Routes, Device} from '../services/configs';

const MainLayout = (props) => {
    const { pathname } = props.location;
    //redux
    const player = useSelector((state) => state.player);
    const tools = useSelector((state) => state.tools); //redux useful tools: like trigger update
    const opponent = useSelector((state) => state.opponent);
    const scoreboard = useSelector((state) => state.scoreboard);
    const dispatch = useDispatch();

    const deviceIsDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
    const deviceIsSmartPhone = useMediaQuery({ query: "(max-width: 768px)" });
    const deviceIsTablet =
        !deviceIsDesktop && !deviceIsSmartPhone;
    if(deviceIsDesktop) dispatch(SetDeviceType(Device.Desktop));
    else if(deviceIsTablet) dispatch(SetDeviceType(Device.Tablet));
    else if(deviceIsSmartPhone) dispatch(SetDeviceType(Device.SmartPhone));
    
    /*this method is for temporary use and for finding items that cause horizontal overflow causing horizontal scrollbar
    const findHorizontalOverflow = () => {
        let docWidth = document.documentElement.offsetWidth;
        [].forEach.call(document.querySelectorAll("*"), function (el) {
            if (el.offsetWidth > docWidth) {
                console.log("here is the sabotage: ", el);
            }
        });
    };*/

    //load player data after sign in
    const userID = userServices.readUserID();
    useEffect(() => {
        dispatch(UpdateMyRecords());
    }, [tools.updateTriggered, dispatch]);
    if (userID && !player) {
        console.log("auth called");
        gameServices
            .loadPlayerData(userID)
            .then((result) => {
                dispatch(LoadMe(result ? result : null));
            })
            .catch((err) => {
                dispatch(LoadMe(null));
            });
    } else if (player && !userID) {
        //still doesnt log out completely automatic:
        //how to sign out after token expires?
        dispatch(SignOut());
    }
    let pageLeftSideBar = <NoticeSideBar />;
    let pageRightSideBar = player ? (
        <PlayerInfoSideBar person={null} inGame={scoreboard.me} />
    ) : (
        <SignInSideBar />
    ); // in case login hassnt been made

    const inProfilePages = pathname.includes(Routes.Client.Profile);

    if (pathname === Routes.Client.SignUp) pageLeftSideBar = pageRightSideBar = null;
    else if (inProfilePages) {
        pageLeftSideBar = null;
        pageRightSideBar = !deviceIsSmartPhone ? <ProfilePanel /> : null; //for now profile panel is hidden in phone
    } else if (pathname === Routes.Client.GameDeck) {
        // left sidebar must be opponents playerInfo
        if (opponent) {
            pageLeftSideBar = (
                <PlayerInfoSideBar person={opponent} inGame={scoreboard.opp} />
            );
        }
        if (deviceIsSmartPhone) {
            //this is temprory
            // find a way for showing result in smartphone, without causing vertical scroll
            pageLeftSideBar = null; //،ٍء\
            pageRightSideBar = null; // change then
        }
    }

    // *******create independent components for each device****????
    // socket global only renders when client is signed in
    return (
        <Fragment>
            {player && <GlobalSocketManager />}
            <ToastContainer />
            <NavigationBar />
            {deviceIsDesktop && (
                <Row className="w-100 mx-auto">
                    {pageRightSideBar && <Col xs={3}>{pageRightSideBar}</Col>}
                    <Col className="mx-auto" xs={pathname !== Routes.Client.SignUp ? null : 7}>
                        {props.children}
                    </Col>
                    {pageLeftSideBar && <Col xs={3}>{pageLeftSideBar}</Col>}
                </Row>
            )}
            {deviceIsTablet && (
                <Row className="w-100 mx-auto">
                    {pathname === Routes.Client.Profile && pageRightSideBar && (
                        <Col xs={4}>{pageRightSideBar}</Col>
                    )}
                    <Col className="mx-auto" xs={pathname !== Routes.Client.SignUp ? null : 7} >
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
