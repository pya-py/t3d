import { ToastContainer } from "react-toastify";
import NavigationBar from "./NavigationBar";
import SignInSideBar from "./../sidebars/SignInSideBar";
import NewsSideBar from "./../sidebars/NewsSideBar";
import { withRouter } from "react-router";
import { useMediaQuery } from "react-responsive";
import SmartPhoneNavigationBar from "./SmartPhoneNavigationBar";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadMe } from "../dashboard/actions";
import { Fragment } from "react";
import userServices from "./../services/userServices";
import gameServices from "../services/gameServices";
const MainLayout = (props) => {
    const { pathname } = props.location;
    //redux
    const player = useSelector((state) => state.player);
    const opponent = useSelector(state => state.opponent);
    const scoreboard = useSelector(state => state.scoreboard);

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

    let pageLeftSideBars = <NewsSideBar />;
    let pageRightSideBar = player ? (
        <PlayerInfoSideBar player={player} inGame={scoreboard.me}/>
    ) : (
        <SignInSideBar />
    ); // in case login hassnt been made

    if (pathname === "/signUp") {
        // || pathname === '/competitions'){ // this condition MUST change later
        pageLeftSideBars = null; //change later
        pageRightSideBar = null; // change then
    }

    if (pathname === "/gameDeck") {
        // left sidebar must be opponents playerInfo
        if(opponent){
            pageLeftSideBars = <PlayerInfoSideBar player={opponent} inGame={scoreboard.opp}/>;
        }
        if (deviceIsSmartPhone) {
            //this is temprory
            // find a way for showing result in smartphone, without causing vertical scroll
            pageLeftSideBars = null; //change later
            pageRightSideBar = null; // change then
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            {deviceIsDesktop || deviceIsTablet ? (
                <NavigationBar />
            ) : (
                <SmartPhoneNavigationBar />
            )}
            {deviceIsDesktop && (
                <div className="row mx-auto w-100">
                    <div className="col-3">{pageRightSideBar}</div>
                    <div
                        className={
                            pageLeftSideBars !== null ? "col-6" : "col-12"
                        }>
                        {props.children}
                    </div>
                    <div className="col-3">{pageLeftSideBars}</div>
                </div>
            )}
            {deviceIsTablet && (
                <div className="row mx-auto w-100">
                    <div
                        className={
                            pageLeftSideBars !== null ? "col-8" : "col-12"
                        }>
                        {props.children}
                    </div>
                    <div className="col-4">{pageLeftSideBars}</div>
                </div>
            )}
            {deviceIsSmartPhone && (
                <div className="container mx-auto w-100">
                    {player ? (
                        <div className="row w-100 mx-auto">
                            {pageRightSideBar}
                        </div>
                    ) : null}
                    <div className="row w-100 mx-auto">{pageLeftSideBars}</div>
                    <div className="row w-100 mx-auto">{props.children}</div>
                </div>
            )}
        </Fragment>
    );
};

export default withRouter(MainLayout);
