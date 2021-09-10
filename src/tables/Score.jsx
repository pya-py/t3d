import "./tables.css";

const Score = ({ playerXName, playerOName, xScores, oScores }) => {
    // format score text:
    let xBorderStyle = null;
    let oBorderStyle = null; // null means default text color
    let xBadgeColor = null;
    let oBadgeColor = null; // null means default badge color

    if (xScores > oScores) {
        // x won
        xBadgeColor = "badge-success";
        xBorderStyle = {
            border: "5px solid green",
            borderRadius: "15px",
            paddingLeft: "1%",
            paddingRight: "1%",
        };
        oBadgeColor = "badge-danger";
        oBorderStyle = null; // null means default text color
    } else if (xScores === oScores) {
        //draw
        xBadgeColor = "badge-warning";
        oBadgeColor = "badge-warning";
        xBorderStyle = null;
        oBorderStyle = null; // null means default text color
    } else {
        // o won
        oBadgeColor = "badge-success";
        oBorderStyle = {
            border: "5px solid green",
            borderRadius: "15px",
            paddingLeft: "1%",
            paddingRight: "1%",
        };
        xBadgeColor = "badge-danger";
        xBorderStyle = null; // null means default text color
    }

    // make this car 'bg-transparent' too?
    return (
        <div className="card border-info mb-3 scoreCard">
            <div className="card-header text-center border-info">نوع بازی</div>
            <div className="card-body">
                <div className="row text-center mx-auto">
                    <span className="col-5" style={xBorderStyle}>{playerXName}</span>
                    <span
                        className={`badge badge-pill ${xBadgeColor} scoreBadge col-1`}
                    >
                        {xScores < 10 ? `0${xScores}` : `${xScores}`}
                    </span>

                    <span
                        className={`badge badge-pill ${oBadgeColor} scoreBadge col-1`}
                    >
                        {oScores < 10 ? `0${oScores}` : `${oScores}`}
                    </span>
                    <span className="col-5" style={oBorderStyle}>{playerOName}</span>
                </div>
            </div>
            <button
                id="btnReplayGame"
                className="btn btn-outline-info btn-lg btn-block"
            >
                بازپخش بازی
            </button>
            {/*1st method: pass key to the score.jsx and find the specific game to replay
            2nd method: pass replay function from AllScores.jsx to Scores.jsx ? */}
        </div>
    );
};

export default Score;
