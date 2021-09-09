import { ToastContainer } from "react-toastify";
import NavigationBar from "./NavigationBar";
import SignInSideBar from "./../sidebars/SignInSideBar";
import NewsSideBar from "./../sidebars/NewsSideBar";
import { withRouter } from "react-router";
import { useMediaQuery } from "react-responsive";
import SmartPhoneNavigationBar from "./SmartPhoneNavigationBar";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import userServices from "../services/userServices";
import MainContext from "./MainContext";
import { useState } from "react";

const MainLayout = (props) => {
    const { pathname } = props.location;
    const deviceIsDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
    const deviceIsSmartPhone = useMediaQuery({ query: "(max-width: 768px)" });
    const deviceIsTablet =
        !deviceIsDesktop && !deviceIsSmartPhone ? true : false;
    const [player, setPlayer] = useState(null);
    // this method is for temporary use and for finding items that cause horizontal overflow causing horizontal scrollbar
    const findHorizontalOverflow = () => {
        let docWidth = document.documentElement.offsetWidth;
        [].forEach.call(document.querySelectorAll("*"), function (el) {
            if (el.offsetWidth > docWidth) {
                console.log("here is the sabotage: ", el);
            }
        });
    };

    // get player records
    const gatherPlayerData = () => {
        (async () => {
            const STATUS = { SUCCESSFULL: 200 };
            const userID = userServices.readUserID();
            if (userID) {
                const { data, status } = await userServices.getPlayer(userID);
                if (status === STATUS.SUCCESSFULL) return data.player;
            }
            return null;
        })()
            .then((result) => {
                console.log("auth called");
                setPlayer(result);
            })
            .catch((err) => {
                // handle error
                setPlayer(null);
            });
    };
    // use an anonymous function to check wether a reliable sign in has been made or not
    // using await causes all 'return' to return a promise. so it must be handles by .then .catch
    if (!player) gatherPlayerData();

    const signOutPlayer = () => {
        sessionStorage.clear();
        setPlayer(null);
    };

    let pageLeftSideBars = <NewsSideBar />;
    let pageRightSideBar = player ? <PlayerInfoSideBar /> : <SignInSideBar />; // in case login hassnt been made

    if (pathname === "/signUp") {
        // || pathname === '/competitions'){ // this condition MUST change later
        pageLeftSideBars = null; //change later
        pageRightSideBar = null; // change then
    }

    if (pathname === "/gameDeck") {
        // left sidebar must be opponents playerInfo

        if (deviceIsSmartPhone) {
            //this is temprory
            // find a way for showing result in smartphone, without causing vertical scroll
            pageLeftSideBars = null; //change later
            pageRightSideBar = null; // change then
        }
    }

    return (
        <MainContext.Provider value={{ player, signOutPlayer, gatherPlayerData }}>
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
                        }
                    >
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
                        }
                    >
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
            {/* {findHorizontalOverflow()} */}
        </MainContext.Provider>
    );
};

export default withRouter(MainLayout);
