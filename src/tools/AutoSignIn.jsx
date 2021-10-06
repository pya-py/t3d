import { useDispatch } from "react-redux";
import { LoadMe, SignOut } from "../globals/redux/actions";
import { browserStorage } from "../services/configs";
import gameServices from "../services/http/gameServices";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// auto-sign in if store sign in data was reset
const AutoSignIn = () => {
    const storageUserID = browserStorage.ID();
    const dispatch = useDispatch();
    const opponent = useSelector((state) => state.opponent);
    useEffect(() => {
        console.log("storageUserID user changed");
        if (storageUserID) {
            console.log("auth called");
            gameServices
                .loadPlayerData(storageUserID)
                .then((result) => {
                    dispatch(LoadMe(result));
                    //dispatch(SaveNewToken());
                })
                .catch((err) => {
                    dispatch(LoadMe(null));
                    //dispatch(SaveNewToken());
                });
        }
        else{
            dispatch(LoadMe(null))
        }
    }, [storageUserID, opponent, dispatch]);

    return null;
};

export default AutoSignIn;
