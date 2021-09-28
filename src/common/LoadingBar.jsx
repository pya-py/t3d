import { Fragment, useLayoutEffect, useState } from "react";
import { Planets, Circle2 } from "react-preloaders2";

const LoadingBar = ({ loading }) => {
    const [whichOne, setWhichOne] = useState(0);
    useLayoutEffect(() => {
        document.body.style = { overflowY: "auto" };
        document.body.style = { height: "auto" };
        if(loading)
            setWhichOne(Math.floor(Math.random() * 100));
    }, [loading]);
    const selectedLoader = whichOne % 2 ? <Planets time={0} customLoading={loading} /> : <Circle2 time={0} customLoading={loading} />
    return <Fragment>{loading ? selectedLoader : null}</Fragment>;
};

export default LoadingBar;
