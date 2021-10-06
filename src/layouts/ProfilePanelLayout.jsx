import { Fragment, useContext } from "react";
import { Devices } from "../services/configs";
import ProfilePanel from "../profile/panel/ProfilePanel";
import CollapsedPanel from "../profile/panel/CollapsedPanel";
import { Col, Row } from "react-bootstrap";
import GlobalSocketManager from "./../services/ws/GlobalSocketManager";
import { useSelector } from "react-redux";
import AutoSignIn from "../tools/AutoSignIn";
import GlobalContext from "../globals/state/GlobalContext";

const ProfilePanelLayout = ({ Device, children }) => {
    const user = useSelector((state) => state.player);
    const context = useContext(GlobalContext);
    return (
        <Fragment>
            <AutoSignIn />
            {user && <GlobalSocketManager />}
            {(context.device === Devices.Desktop) ? (
                <Row className="w-100 mx-auto">
                    <Col xs={3}>
                        <ProfilePanel />
                    </Col>
                    <Col>{children}</Col>
                </Row>
            ) : (
                <Row className="w-100 mx-auto">
                    <Col xs={1}>
                        <CollapsedPanel />
                    </Col>
                    <Col>{children}</Col>
                </Row>
            )}
        </Fragment>
    );
};

export default ProfilePanelLayout;
