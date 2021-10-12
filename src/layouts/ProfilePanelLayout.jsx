import { Fragment, useContext, useEffect } from "react";
import { Devices } from "../services/configs";
import ProfilePanel from "../profile/panel/ProfilePanel";
import CollapsedPanel from "../profile/panel/CollapsedPanel";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AutoSignIn from "../users/AutoSignIn";
import GlobalContext from "../globals/state/GlobalContext";
import { LoadMyFriendsChats, ResetMyFriendsChats } from "../globals/redux/actions/friends";

const ProfilePanelLayout = ({ children }) => {
    const context = useContext(GlobalContext);
    const dispatch = useDispatch();

    useEffect(() => {
		dispatch(LoadMyFriendsChats());
		// profile unmounted
		return () => {
			// remove chat list from redux to save memory
            dispatch(ResetMyFriendsChats());
		};
	}, [dispatch]);

    return (
        <Fragment>
            <AutoSignIn />
            {(context.device === Devices.Desktop) ? (
                <Row className="w-100 mx-auto">
                    <Col lg={3}>
                        <ProfilePanel />
                    </Col>
                    <Col lg={9}>{children}</Col>
                </Row>
            ) : (
                <Row className="w-100 mx-auto">
                    <Col className="mx-auto" sm={12}>
                        <CollapsedPanel />
                    </Col>
                    <Col sm={12}>{children}</Col>
                </Row>
            )}
        </Fragment>
    );
};

export default ProfilePanelLayout;
