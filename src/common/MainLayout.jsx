import { ToastContainer } from "react-toastify";
import NavigationBar from "./NavigationBar";
import SignInSideBar from "./../sidebars/SignInSideBar";
import NoticeSideBar from "../sidebars/NoticeSideBar";
import { withRouter } from "react-router";
import { useMediaQuery } from "react-responsive";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
    LoadMe,
    SetDeviceType,
    SignOut,
    UpdateMyRecords,
} from "../dashboard/actions";
import { Fragment, useState, useEffect } from "react";
import userServices from "../services/http/userServices";
import gameServices from "../services/http/gameServices";
import { Col, Container, Row } from "react-bootstrap";
import ProfilePanel from "../profile/ProfilePanel";
import GlobalSocketManager from "../services/ws/GlobalSocketManager";
import { Routes, Device } from "../services/configs";

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
    const deviceIsTablet = !deviceIsDesktop && !deviceIsSmartPhone;
    const [leftSideBar, setLeftSideBar] = useState(null);
    const [rightSideBar, setRightSideBar] = useState(null);
    //load player data after sign in
    const userID = userServices.readUserID();
    // signIn or signOut event
    useEffect(() => {
        console.log("userID changed");
        if (userID) {
            console.log("auth called");
            gameServices
                .loadPlayerData(userID)
                .then((result) => {
                    dispatch(LoadMe(result ? result : null));
                })
                .catch((err) => {
                    dispatch(LoadMe(null));
                });
        } else {
            //how to sign out after token expires?
            dispatch(SignOut());
        }
    }, [userID, dispatch]);

    //device type set || browser width change event.
    useEffect(() => {
        console.log("device changed");
        if (deviceIsDesktop) dispatch(SetDeviceType(Device.Desktop));
        else if (deviceIsTablet) dispatch(SetDeviceType(Device.Tablet));
        else if (deviceIsSmartPhone) dispatch(SetDeviceType(Device.SmartPhone));

        setLeftSideBar(<NoticeSideBar />);
    }, [deviceIsDesktop, deviceIsTablet, deviceIsSmartPhone, dispatch]);

    /*this method is for temporary use and for finding items that cause horizontal overflow causing horizontal scrollbar
    const findHorizontalOverflow = () => {
        let docWidth = document.documentElement.offsetWidth;
        [].forEach.call(document.querySelectorAll("*"), function (el) {
            if (el.offsetWidth > docWidth) {
                console.log("here is the sabotage: ", el);
            }
        });
    };*/

    useEffect(() => {
        console.log("update triggered");
        dispatch(UpdateMyRecords());
    }, [tools.updateTriggered, dispatch]);

    //teste
    //determine sidebars
    useEffect(() => {
        const setPrimaryRightSideBar = () => {
            if (!deviceIsTablet)
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
            if (opponent) {
                if (!deviceIsSmartPhone) {
                    setLeftSideBar(
                        <PlayerInfoSideBar
                            person={opponent}
                            inGame={scoreboard.opp}
                        />
                    );
                    setPrimaryRightSideBar();
                } else {
                    setLeftSideBar(null);
                    setRightSideBar(null);
                }
            }
        } else if (pathname.includes(Routes.Client.Profile)) {
            setLeftSideBar(null);
            setRightSideBar(<ProfilePanel />); //!deviceIsSmartPhone ? <ProfilePanel /> : null)
        } else {
            setLeftSideBar(<NoticeSideBar />); //EDIT THIS
            setPrimaryRightSideBar();
        }
    }, [player, opponent, pathname, deviceIsSmartPhone, scoreboard, deviceIsTablet]);

    return (
        <Fragment>
            {player && <GlobalSocketManager />}
            <ToastContainer />
            <NavigationBar />
            {!deviceIsSmartPhone ? (
                <Row className="w-100 mx-auto">
                    {rightSideBar && <Col xs={3}>{rightSideBar}</Col>}
                    <Col
                        className="mx-auto"
                        xs={pathname !== Routes.Client.SignUp ? null : 7}>
                        {props.children}
                    </Col>
                    {leftSideBar && (
                        <Col xs={!deviceIsTablet ? 3 : 4}>{leftSideBar}</Col>
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
