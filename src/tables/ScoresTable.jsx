import './tables.css';
import { Component } from 'react';
import AllScores from './AllScores';
import gameServices from './../services/gameServices';


class ScoresTable extends Component {
    state = { 
        liveScores: [ ],
        finalScores: [ ],
        showLiveOnes: false,
        loading: false
     };

     componentDidMount() {
         // get all game results , live or final, handling promises
         // client and server side for this Module seriously need to be edited
        (async () => {
            this.setState({ loading: true }); // use preloader here?
            const STATUS = { SUCCESSFULL: 200 };
            const { data, status } = await gameServices.getAllResults();
            if (status === STATUS.SUCCESSFULL) return data.gameResults;
            return [];
        })()
            .then((result) => {
                this.setState({liveScores: result.filter(game => game.isLive), finalScores: result.filter(game => !game.isLive), loading: false});
                //EDIT EDIT EDIT
            })
            .catch((err) => {
                //******* handle errors */
                // console.log(err);
                this.setState({ finalScores: [], loading: false });
            });
    }

    btnShowLiveScores = () => {
        this.setState({showLiveOnes: true});

    }

    btnShowFinalScores = () => {
        this.setState({showLiveOnes: false});
    }

    render() {
        // game replay? is it a good idea DataBase Size-Wise ? ===> if true: see 1st page of the notebook
        /* add a NextGames button maybe? (گزینه بازی های اینده) */
        let {liveScores, finalScores, showLiveOnes} = this.state;

        return ( 
            <div className="container">
                <div className="row">
                    <div className='col-6'>
                       <button
                        className={`scoresTypeSelectButton btn ${showLiveOnes ? `btn-outline-success` : `btn-outline-primary`}`}
                        onClick={this.btnShowLiveScores}  >نتایج زنده</button>
                    </div>
                    <div className='col-6'>
                        <button 
                            className={`scoresTypeSelectButton btn ${showLiveOnes ? `btn-outline-primary` : `btn-outline-success`}`}
                            onClick={this.btnShowFinalScores}  >نتایج نهایی</button> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <AllScores scores={showLiveOnes? liveScores : finalScores} />
                    </div>
                </div>
                

            </div>
        );
    }
}
 
export default ScoresTable;