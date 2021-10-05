import { useState, useEffect } from "react";
import ScoresTable from "./tables/scores/ScoresTable";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameGuide from "./informations/GameGuide";
import ContactUs from "./informations/ContactUs";
import SignUp from "./users/SignUp";
import MainLayout from "./layouts/MainLayout";
import Rankings from "./tables/rankings/Rankings";
import GameDeck from "./games/GameDeck";
import NoticeManager from "./profile/NoticeManager";
import AccountCredentials from "./profile/AcountCredentials";
import MyGamesAndFriends from "./profile/friendgames/MyGamesAndFriends";
import { Routes } from "./services/configs";
import ChatRoom from "./chat/ChatRoom";
import ProfilePanelLayout from "./layouts/ProfilePanelLayout";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./commons/NavigationBar";
const App = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
    const isSmartPhone = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = !isDesktop && !isSmartPhone;
    const [device, setDevice] = useState(null);

    useEffect(() => {
        // find device mode
        // array is sorted according to Configs.Devices
        setDevice(
            [isDesktop, isTablet, isSmartPhone].findIndex((mode) => mode)
        ); //return the index of the one that is true -> wich is the curret device mode
    }, [isDesktop, isTablet, isSmartPhone]);
    return (
        <BrowserRouter>
            <NavigationBar Device={device}/>
            <ToastContainer />
            <Switch>
                <Route path={`${Routes.Client.Profile}/:path?`} exact>
                    <ProfilePanelLayout Device={device}>
                        <Switch>
                            <Route path={Routes.Client.MyGamesAndFriends}>
                                <MyGamesAndFriends />
                            </Route>
                            <Route path={Routes.Client.Notices}>
                                <NoticeManager />
                            </Route>

                            <Route path={Routes.Client.ChatRoom}>
                                <ChatRoom Device={device} />
                            </Route>

                            <Route exact path={Routes.Client.Profile}>
                                <AccountCredentials />
                            </Route>
                        </Switch>
                    </ProfilePanelLayout>
                </Route>
                <Route>
                    <MainLayout Device={device}>
                        <Switch>
                            <Route path={Routes.Client.SignUp}>
                                <SignUp />
                            </Route>

                            <Route path={Routes.Client.GameDeck}>
                                <GameDeck />
                            </Route>
                            <Route path={Routes.Client.Rankings}>
                                <Rankings />
                            </Route>
                            <Route path={Routes.Client.GameGuide}>
                                <GameGuide />/
                            </Route>
                            <Route path={Routes.Client.ContactUs}>
                                <ContactUs />
                            </Route>

                            <Route path={Routes.Client.Root} exact>
                                <ScoresTable />
                            </Route>
                        </Switch>
                    </MainLayout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
