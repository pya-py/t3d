import { Fragment } from "react";
import SingleScoreCard from "./SingleScoreCard";

const AllScores = ({scores}) => {
    return ( 
        <Fragment>
            { scores.map(score => (
                <SingleScoreCard key={score.gameID}
                    playerXName={score.xName}
                    playerOName={score.oName}
                    xScore={score.xScore}
                    oScore={score.oScore}
                ></SingleScoreCard>
            )) }
        </Fragment>
     );
};
 
export default AllScores;