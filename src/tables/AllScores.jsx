import Score from "./Score";

const AllScores = ({scores}) => {
    return ( 
        <div>
            { scores.map(score => (
                <Score key={score.id}
                    playerXName={score.playerXName}
                    playerOName={score.playerOName}
                    xScore={score.xScore}
                    oScore={score.oScore}
                ></Score>
            )) }
        </div>
     );
};
 
export default AllScores;