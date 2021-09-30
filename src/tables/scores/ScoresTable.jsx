import "../tables.css";
import { Component } from "react";
import AllScores from "./AllScores";
import gameServices from "../../services/http/gameServices";
import Configs from '../../services/configs';

class ScoresTable extends Component {
    state = {
        liveScores: [],
        finalScores: [],
        showLiveOnes: false,
        loading: false,
    };

    componentDidMount() {
        // get all game results , live or final, handling promises
        // client and server side for this Module seriously need to be edited
        (async () => {
            this.setState({ loading: true }); // use preloader here?
            const { data, status } = await gameServices.getAllGames();
            if (status === Configs.Status.Successful) return data.allGames;
            return [];
        })()
            .then((result) => {
                result = result.reverse();
                this.setState({
                    liveScores: result.filter((game) => game.isLive),
                    finalScores: result.filter((game) => !game.isLive),
                    loading: false,
                });
                //EDIT EDIT EDIT
            })
            .catch((err) => {
                //******* handle errors */
                // console.log(err);
                this.setState({ finalScores: [], loading: false });
            });
    }

    btnShowLiveScores = () => {
        this.setState({ showLiveOnes: true });
    };

    btnShowFinalScores = () => {
        this.setState({ showLiveOnes: false });
    };

    render() {
        // game replay? is it a good idea DataBase Size-Wise ? ===> if true: see 1st page of the notebook
        /* add a NextGames button maybe? (گزینه بازی های اینده) */
        let { liveScores, finalScores, showLiveOnes } = this.state;

        // DESIGN : USE <Tabs> ???
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <button
                            className={`scoresTypeSelectButton btn ${
                                showLiveOnes
                                    ? `btn-outline-success`
                                    : `btn-outline-primary`
                            }`}
                            onClick={this.btnShowLiveScores}>
                            نتایج زنده
                            <i
                                className="fa fa-play-circle px-3"
                                aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="col-6">
                        <button
                            className={`scoresTypeSelectButton btn ${
                                showLiveOnes
                                    ? `btn-outline-primary`
                                    : `btn-outline-success`
                            }`}
                            onClick={this.btnShowFinalScores}>
                            نتایج نهایی
                            <i
                                className="fa fa-stop-circle-o px-3"
                                aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <AllScores
                            scores={showLiveOnes ? liveScores : finalScores}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoresTable;
