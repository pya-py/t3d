import './scoresTable.css';
import { Component } from 'react';
import AllScores from './AllScores';


class ScoresTable extends Component {
    state = { 
        liveScores: [ {id:0, playerXName: 'سهند علی زاده', playerOName: 'علی رضا قربانی', xScore: 10, oScore: 6},
                         {id:1 ,playerXName: 'paya', playerOName: 'whatever', xScore: 15, oScore: 1},
                         {id:2 ,playerXName: 'مجید نویدزاده', playerOName: 'علی یاری', xScore: 8, oScore: 8},
                         {id:3 ,playerXName: 'مجتبی حسینی', playerOName: 'مصطفی علی مردانی', xScore: 2, oScore: 14},
                         {id:4 ,playerXName: 'مجتبی حسینی', playerOName: 'مصطفی علی مردانی', xScore: 2, oScore: 14},
                         {id:5 ,playerXName: 'مجتبی حسینی', playerOName: 'مصطفی علی مردانی', xScore: 2, oScore: 14} ],
        finalScores: [ {id:0, playerXName: 'نوید بختیاری', playerOName: 'محسن رضایی', xScore: 0, oScore: 6},
                        {id:1 ,playerXName: 'پرهام کبیری', playerOName: 'سمانه سماوی', xScore: 2, oScore: 4},
                        {id:2 ,playerXName: 'مجید داورخواه', playerOName: 'زهرا فنایی', xScore: 4, oScore: 12},
                        {id:3 ,playerXName: 'امیر صفوی نسب', playerOName: 'paya', xScore: 3, oScore: 3} ],
        showLiveOnes: true
     };

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