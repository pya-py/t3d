import { Component } from "react";
import ScoresTable from "./tables/scores/ScoresTable";
import { Route, Switch } from "react-router-dom";
import GameRules from "./informations/GameRules";
import ContactInfo from "./informations/ContactInfo";
import SignUp from "./users/SignUp";
import MainLayout from "./common/MainLayout";
import Ranking from "./tables/ranking/Ranking";
import ControlPanel from './controlpanel/ControlPanel';
import GameDeck from './games/GameDeck';
import NoticeManager from './controlpanel/NoticeManager';
import AccountCredentials from './controlpanel/AcountCredentials';

class App extends Component {
    // 1. use uuid to produce ids
    // state = {  }
    
    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/gameDeck" component={GameDeck} />
                    <Route path="/ranking" component={Ranking} />
                    <Route path="/gameRules" component={GameRules} />
                    <Route path="/contactInfo" component={ContactInfo} />
                    <Route path="/controlPanel/info" component={AccountCredentials} />
                    <Route path="/controlPanel/admin/notices" component={NoticeManager} />
                    <Route path="/controlPanel" exact component={ControlPanel} />
                    <Route path="/" exact component={ScoresTable} />
                </Switch>
            </MainLayout>
        );
    }
}

export default App;
