import { Fragment } from "react";
import Score from "./Score";

const AllScores = ({scores}) => {
    return ( 
        <Fragment>
            { scores.map(score => (
                <Score key={score.gameID}
                    playerXName={score.xName}
                    playerOName={score.oName}
                    xScores={score.xScores}
                    oScores={score.oScores}
                ></Score>
            )) }
        </Fragment>
     );
};
 
export default AllScores;