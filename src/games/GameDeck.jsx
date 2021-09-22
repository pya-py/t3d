import GamePlay from './GamePlay';
import { useSelector } from "react-redux";
import { Fragment } from 'react';
import RoomManager from './RoomManager';

const GameDeck = () => {
    const room = useSelector(state => state.room);

    return ( 
        <Fragment>
            {room ? <GamePlay /> : <RoomManager />}
        </Fragment>
     );
}
 
export default GameDeck;
