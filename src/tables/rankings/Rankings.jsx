import { Component } from "react";
import AllPlayers from "./AllPlayers";
import userServices from "../../services/http/userServices";
import LoadingBar from "../../commons/LoadingBar";
import Configs from '../../services/configs';
import { Row } from "react-bootstrap";

class Rankings extends Component {
    state = { players: [], loading: false };

    componentDidMount() {
        (async () => {
            this.setState({ loading: true });
            const { data, status } = await userServices.getAllPlayers();
            if (status === Configs.Status.Successful) return data.players;
            return [];
        })()
            .then((result) => {
                let tempPlayers = [...result];
                this.setState({
                    players: tempPlayers.sort( //sort priorities: 1. more points 2. more wins 3. less loses
                        (p1, p2) =>
                            p2.records.points - p1.records.points ||
                            p2.records.wins - p1.records.wins ||
                            p1.records.loses - p2.records.loses
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
            <Row className="mx-auto mt-3">
                {loading ? <LoadingBar loading={loading} /> : null}
                <Row className="w-100 mx-auto">
                    <AllPlayers players={players} />
                </Row>
            </Row>
        );
    }
}

export default Rankings;
