import { useLayoutEffect } from "react";
import { Planets } from "react-preloaders2";

const LoadingBar = ({ loading }) => {
    useLayoutEffect(() => {
        document.body.style = { overflowY: "auto" };
        document.body.style = { height: "auto" };
    }, [loading]);

    return <>{loading ? <Planets time={0} customLoading={loading} /> : null}</>;
};

export default LoadingBar;
