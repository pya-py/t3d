import { Fragment, useContext } from "react";
import { Devices } from "../services/configs";
import ProfilePanel from "../profile/panel/ProfilePanel";
import CollapsedPanel from "../profile/panel/CollapsedPanel";
import { Col, Row } from "react-bootstrap";
import GlobalSocketManager from "./../services/ws/GlobalSocketManager";
import { useSelector } from "react-redux";
import AutoSignIn from "../users/AutoSignIn";
import GlobalContext from "../globals/state/GlobalContext";

const ProfilePanelLayout = ({ children }) => {
    const me = useSelector((state) => state.me);
    const context = useContext(GlobalContext);
    return (
        <Fragment>
            <AutoSignIn />
            {me && <GlobalSocketManager />}
            {(context.device === Devices.Desktop) ? (
                <Row className="w-100 mx-auto">
                    <Col lg={3}>
                        <ProfilePanel />
                    </Col>
                    <Col>{children}</Col>
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
