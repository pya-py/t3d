import { Alert } from "react-bootstrap";
import noAvatar from "./no-avatar.png"; // definitely must be changed bro!

const PlayerInfoSideBar = (props) => {
    const { player, inGame } = props;
    return (
        <div className="card playerInfoSideBar border-info">
            <div className="card-header text-center text-info border-info">
                {player.fullname}
            </div>
            <img
                className="card-img-top playerAvatar"
                src={noAvatar}
                alt="مشکلی در بارگذاری تصویر پیش آمد"
            />
            <hr />
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {inGame && (
                        <li className="text-center list-group-item">
                            <Alert variant={inGame.index ? "danger" : "primary"}>
                                <Alert.Heading>
                                    {inGame.shape} : {inGame.score}
                                </Alert.Heading>
                                
                            </Alert>
                        </li>
                    )}
                    <li className=" list-group-item">
                        <div className="row">
                            <p className="col-6 text-right">امتیاز بازیکن</p>
                            <p className="col-6 text-left">
                                {player.records.points}
                            </p>
                        </div>
                    </li>
                    <li className=" list-group-item">
                        <div className="row">
                            <p className="col-6 text-right">تعداد برد</p>
                            <p className="col-6 text-left">
                                {player.records.wins}
                            </p>
                        </div>
                    </li>
                    <li className=" list-group-item">
                        <div className="row">
                            <p className="col-6 text-right">تعداد باخت</p>
                            <p className="col-6 text-left">
                                {player.records.loses}
                            </p>
                        </div>
                    </li>
                    <li className=" list-group-item">
                        <div className="row">
                            <p className="col-6 text-right">تعداد تساوی</p>
                            <p className="col-6 text-left">
                                {player.records.draws}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PlayerInfoSideBar;
