import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetRoom } from "../dashboard/actions";
import { Button } from "react-bootstrap";

const RoomManager = () => {
    const [roomName, setRoomName] = useState("");
    const [gameType, setGameType] = useState(4);
    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const onStartGameClick = (event) => {
        event.preventDefault();

        if (!player) {
            toast.error("ابتدا وارد حساب کاربری خود شوید");
            return;
        }

        dispatch(SetRoom({ roomName, gameType })); //set redux state room => roomname
    };

    return (
        <Fragment>
            <div className="card border-warning mb-3 singleCard">
                <div className="card-header text-center border-warning">
                    اتصال بازیکنان
                </div>
                <div className="card-body text-right">
                    <form onSubmit={(event) => onStartGameClick(event)}>
                        <div className="form-inline">
                            <label className="w-25">ابعاد جدول بازی</label>
                            <label
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "15px",
                                    padding: "5px",
                                }}
                                className="w-25">
                                <input
                                    type="radio"
                                    className="mx-auto form-control"
                                    value="3"
                                    checked={gameType === 3}
                                    onChange={() => setGameType(3)}
                                />
                                3x3x3
                            </label>
                            <label
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "15px",
                                    padding: "5px",
                                }}
                                className="w-25 ">
                                <input
                                    type="radio"
                                    className="mx-auto form-control"
                                    value="4"
                                    checked={gameType === 4}
                                    onChange={() => setGameType(4)}
                                />
                                4x4x4
                            </label>
                            <label
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "15px",
                                    padding: "5px",
                                }}
                                className="w-25">
                                <input
                                    type="radio"
                                    className="mx-auto form-control"
                                    value="5"
                                    checked={gameType === 5}
                                    onChange={() => setGameType(5)}
                                />
                                5x5x5
                            </label>
                        </div>
                        <div className="form-inline mt-3">
                            <label className="w-25">نام روم</label>
                            <input
                                type="text"
                                className="form-control w-75"
                                placeholder="Room Name"
                                value={roomName}
                                required="required"
                                onChange={(event) =>
                                    setRoomName(event.target.value)
                                }
                            />
                        </div>

                        <Button type="submit" className="mt-4" block variant="success">
                            <i class="fa fa-cube px-3" aria-hidden="true"></i>
                            شروع بازی
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default RoomManager;
