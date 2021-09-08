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
                    <Route path="t3d/signUp" exact component={SignUp} />
                    <Route path="t3d/gameDeck" exact component={GameDeck} />
                    <Route path="t3d/ranking" exact component={Ranking} />
                    <Route path="t3d/gameRules" exact component={GameRules} />
                    <Route path="t3d/contactInfo" exact component={ContactInfo} />
                    <Route path="t3d/" exact component={ScoresTable} />
                    <Route path="t3d/controlPanel" exact component={ControlPanel} />
                </Switch>
            </MainLayout>
        );
    }
}

export default App;
