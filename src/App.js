import { Component } from "react";
import ScoresTable from "./tables/scores/ScoresTable";
import { Route, Switch } from "react-router-dom";
import GameGuide from "./informations/GameGuide";
import ContactUs from "./informations/ContactUs";
import SignUp from "./users/SignUp";
import MainLayout from "./common/MainLayout";
import Rankings from "./tables/rankings/Rankings";
import GameDeck from "./games/GameDeck";
import NoticeManager from "./profile/NoticeManager";
import AccountCredentials from "./profile/AcountCredentials";
import MyGamesAndFriends from "./profile/MyGamesAndFriends";
import { Routes } from "./services/configs";
import ChatRoom from "./chat/ChatRoom";

class App extends Component {
    // 1. use uuid to produce ids
    // state = {  }

    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route path={Routes.Client.SignUp} component={SignUp} />
                    <Route path={Routes.Client.GameDeck} component={GameDeck} />
                    <Route path={Routes.Client.Rankings} component={Rankings} />
                    <Route
                        path={Routes.Client.GameGuide}
                        component={GameGuide}
                    />
                    <Route
                        path={Routes.Client.ContactUs}
                        component={ContactUs}
                    />

                    <Route
                        path={Routes.Client.MyGamesAndFriends}
                        component={MyGamesAndFriends}
                    />
                    <Route
                        path={Routes.Client.Notices}
                        component={NoticeManager}
                    />
                    <Route
                        exact
                        path={Routes.Client.Profile}
                        component={AccountCredentials}
                    />
                    <Route
                        path={Routes.Client.ChatRoom}
                        component={ChatRoom}
                    />
                    
                    <Route
                        path={Routes.Client.Root}
                        exact
                        component={ScoresTable}
                    />
                </Switch>
            </MainLayout>
        );
    }
}

export default App;
