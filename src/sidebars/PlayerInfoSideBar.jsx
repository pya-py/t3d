import { Component } from "react";
import MainContext from "../common/MainContext";
import noAvatar from "./no-avatar.png"; // definitely must be changed bro!

class PlayerInfoSideBar extends Component {
  static contextType = MainContext;

  state = {};

  render() {
    const { player } = this.context;
    return (
      <div className="card playerInfoSideBar border-info mb-3">
        <div className="card-header text-center text-info border-info">
          {player.fullname}
        </div>
        <img
          className="card-img-top playerAvatar"
          src={noAvatar}
          alt="No Images Found"
        />
        <hr />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className=" list-group-item">
              <div className="row">
                <p className="col-6 text-right">امتیاز بازیکن</p>
                <p className="col-6 text-left">{player.records.points}</p>
              </div>
            </li>
            <li className=" list-group-item">
              <div className="row">
                <p className="col-6 text-right">تعداد برد</p>
                <p className="col-6 text-left">{player.records.wins}</p>
              </div>
            </li>
            <li className=" list-group-item">
              <div className="row">
                <p className="col-6 text-right">تعداد باخت</p>
                <p className="col-6 text-left">{player.records.loses}</p>
              </div>
            </li>
            <li className=" list-group-item">
              <div className="row">
                <p className="col-6 text-right">تعداد تساوی</p>
                <p className="col-6 text-left">{player.records.draws}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PlayerInfoSideBar;
