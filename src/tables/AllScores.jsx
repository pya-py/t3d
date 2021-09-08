import { Fragment } from "react";
import Score from "./Score";

const AllScores = ({scores}) => {
    return ( 
        <Fragment>
            { scores.map(score => (
                <Score key={score.id}
                    playerXName={score.playerXName}
                    playerOName={score.playerOName}
                    xScore={score.xScore}
                    oScore={score.oScore}
                ></Score>
            )) }
        </Fragment>
     );
};
 
export default AllScores;