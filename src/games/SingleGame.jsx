import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetRoom, TriggerOpponentSearch } from "../dashboard/actions";
import { Button, Form, InputGroup } from "react-bootstrap";
import LoadingBar from '../common/LoadingBar';

const RoomManager = ({ friendlyGame }) => {
    const [roomName, setRoomName] = useState("");
    const [gameType, setGameType] = useState(4);
    const player = useSelector((state) => state.player);
    const [searching, setSearching] = useState(false);

    const dispatch = useDispatch();

    const onStartGameClick = (event) => {
        event.preventDefault();
        if (!player) {
            toast.error("ابتدا وارد حساب کاربری خود شوید");
            return;
        }
        if (friendlyGame) dispatch(SetRoom({ name: roomName, type: gameType }));
        // random game:
        else {
            dispatch(SetRoom({ name: null, type: gameType }));
            dispatch(TriggerOpponentSearch());
            setSearching(true);
        }
    };

    //on destroy
    useEffect(() => {
        return () => {
            setSearching(false); //make sure preloader turns off
         }
    }, [])
    return (
        <Fragment>
            <LoadingBar loading={searching} />
            <hr />
            <Form onSubmit={(event) => onStartGameClick(event)}>
                <Form.Group className="form-inline">
                    <Form.Label className="w-25">ابعاد جدول</Form.Label>
                    <InputGroup
                        style={{
                            border: "1px solid orange",
                            borderRadius: "5px",
                            padding: "2px",
                        }}>
                        <InputGroup.Prepend className="mx-5">
                            <InputGroup.Radio
                                value="3"
                                name="tableDimension"
                                checked={gameType === 3}
                                onChange={() => setGameType(3)}
                            />
                            <InputGroup.Text>3 * 3 * 3</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-5">
                            <InputGroup.Radio
                                value="4"
                                name="tableDimension"
                                checked={gameType === 4}
                                onChange={() => setGameType(4)}
                            />
                            <InputGroup.Text>4 * 4 * 4</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-5">
                            <InputGroup.Radio
                                value="5"
                                name="tableDimension"
                                checked={gameType === 5}
                                onChange={() => setGameType(5)}
                            />
                            <InputGroup.Text>5 * 5 * 5</InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>
                <hr />
                {friendlyGame && (
                    
                    <Form.Group className="mt-3 form-inline">
                        
                        <Form.Label className="w-25">نام روم</Form.Label>
                        <Form.Control
                            type="text"
                            className="w-75 text-left bg-transparent"
                            placeholder="Room Name"
                            value={roomName}
                            required="required"
                            onChange={(event) =>
                                setRoomName(event.target.value)
                            }
                        />
                    </Form.Group>
                )}
                <hr />
                <Button type="submit" className="mt-4" block variant="success">
                    <i
                        className={`fa ${
                            friendlyGame ? "fa-handshake-o" : "fa-search"
                        } px-2`}
                        aria-hidden="true"></i>
                    {friendlyGame ? "ارسال درخواست" : "جستجو"}
                </Button>
            </Form>
        </Fragment>
    );
};

export default RoomManager;
