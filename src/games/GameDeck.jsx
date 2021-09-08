import { Component } from "react";
import { toast } from "react-toastify";
import MainContext from "./../common/MainContext";
import GamePlay from './GamePlay';

class GameDeck extends Component {
    static contextType = MainContext;
    state = {
        roomName: "",
        startGame: false,
    };

    onStartGameClick = (event) => {
        event.preventDefault();
        const { player } = this.context;
        const { roomName } = this.state;
        if (player) {
            if (roomName) this.setState({ startGame: true });
        } else {
            toast.error("ابتدا وارد حساب کاربری خود شوید");
        }
    };
    render() {
        const { roomName, startGame } = this.state;

        return (
            <div>
                {!startGame && (
                    <div className="card border-warning mb-3 singleCard">
                        <div className="card-header text-center border-warning">
                            اتصال بازیکنان
                        </div>
                        <div className="card-body text-right">
                            <form
                                onSubmit={(event) =>
                                    this.onStartGameClick(event)
                                }
                            >
                                <div className="form-inline">
                                    <label className="w-25">نام روم</label>
                                    <input
                                        type="text"
                                        className="form-control w-75"
                                        placeholder="Room Name"
                                        value={roomName}
                                        required="required"
                                        onChange={(event) =>
                                            this.setState({
                                                roomName: event.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-block mt-4"
                                >
                                    شروع بازی
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {startGame && <GamePlay roomName={roomName} />}
            </div>
        );
    }
}

export default GameDeck;
