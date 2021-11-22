import { useSelector } from 'react-redux';
const SinglePlayerCard = ({rowNumber, playerID, name, points, wins, loses, draws }) => {
    const me = useSelector(state => state.me);

    return (
        <tr className={!me || playerID !== me.userID ? "" : "bg-success"}>
            <th scope="row">{rowNumber}</th>
            <td>{name}</td>
            <td>{points}</td>
            <td>{wins}</td>
            <td>{loses}</td>
            <td>{draws}</td>
        </tr>
    );
};

export default SinglePlayerCard;
