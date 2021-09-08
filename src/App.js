import { Component } from "react";
import ScoresTable from "./tables/ScoresTable";
import { Route, Switch } from "react-router-dom";
import GameRules from "./informations/GameRules";
import ContactInfo from "./informations/ContactInfo";
import SignUp from "./users/SignUp";
import MainLayout from "./common/MainLayout";
import Ranking from "./tables/Ranking";
import ControlPanel from './users/ControlPanel';
import GameDeck from './games/GameDeck';

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
                    <Route path="/" exact component={ScoresTable} />
                    <Route path="/controlPanel" exact component={ControlPanel} />
                </Switch>
            </MainLayout>
        );
    }
}

export default App;
