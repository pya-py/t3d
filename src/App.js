import { Component } from "react";
import ScoresTable from "./tables/ScoresTable";
import { Route, Switch } from "react-router-dom";
import GameRules from "./site-info/GameRules";
import ContactInfo from "./site-info/ContactInfo";
import GamePlay from "./thegame/GamePlay";
import SignUp from "./users/SignUp";
import MainLayout from "./common/MainLayout";
import Ranking from "./tables/Ranking";
import ControlPanel from './users/ControlPanel';

class App extends Component {
    // 1. use uuid to produce ids
    // state = {  }
    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/theGame" component={GamePlay} />
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
