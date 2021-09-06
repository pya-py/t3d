import { Component } from "react";
import AllPlayers from "./AllPlayers";
import userServices from "./../services/userServices";
import LoadingBar from "../common/LoadingBar";

class Ranking extends Component {
    state = { players: [], loading: false };

    componentDidMount() {
        (async () => {
            this.setState({ loading: true });
            const STATUS = { SUCCESSFULL: 200 };
            const { data, status } = await userServices.getAllPlayers();
            if (status === STATUS.SUCCESSFULL) return data.players;
            return [];
        })()
            .then((result) => {
                let tempPlayers = [...result];
                this.setState({
                    players: tempPlayers.sort(
                        (p1, p2) => p2.records.points - p1.records.points
                    ),
                    loading: false,
                });
            })
            .catch((err) => {
                //******* handle errors */
                // console.log(err);
                this.setState({ players: [], loading: false });
            });
    }
    render() {
        const { players, loading } = this.state;
        return (
            <div className="row mt-3">
                {loading ? <LoadingBar loading={loading} /> : null}
                <div className="col-12">
                    <AllPlayers players={players} />
                </div>
            </div>
        );
    }
}

export default Ranking;
