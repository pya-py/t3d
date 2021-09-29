import { Fragment } from "react";
import { useSelector } from 'react-redux';
import LoadingBar from "../common/LoadingBar";
import userServices from './../services/http/userServices';
import Configs from '../services/configs';

const MyFriends = () => {
    const player = useSelector(state => state.player);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try{
            const {status, data} = userServices.getFriends();
           // if(status === Configs.Status.Successful) return 
        }catch(err){

        }
    }, [player]);
    return ( 
        <Fragment>
            <LoadingBar loading={loading} />
        </Fragment>
     );
}
 
export default MyFriends;