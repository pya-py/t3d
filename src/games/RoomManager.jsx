import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetRoom } from "../dashboard/actions";

const RoomManager = () => {
    const [roomName, setRoomName] = useState("");
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    const onStartGameClick = (event) => {
        event.preventDefault();
        

        if (!player) {
            toast.error("ابتدا وارد حساب کاربری خود شوید");
            return;
        }

        dispatch(SetRoom(roomName)); //set redux state room => roomname

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

                        <button
                            type="submit"
                            className="btn btn-success btn-block mt-4">
                            شروع بازی
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default RoomManager;
