import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import "../profile.css";
import { useSelector } from "react-redux";
import { Fragment, useContext } from "react";
import Configs from "../../services/configs";
import GlobalContext from "../../globals/state/GlobalContext";

const CollapsedPanel = (props) => {
    const me = useSelector((state) => state.me);
    const context = useContext(GlobalContext);
    return (
        <Row bg="light" className="profile-panel-sidebar-collapsed w-100 mx-auto pl-5">
            <NavLink activeClassName="btn btn-primary"
                exact
                to={Configs.Routes.Client.Profile}
                className="nav-link"
                aria-current="page">
                <i className="fa fa-user-o" aria-hidden="true"></i>
            </NavLink>
            <NavLink activeClassName="btn btn-primary"
                className="nav-link"
                to={Configs.Routes.Client.MyGamesAndFriends}>
                <i className="fa fa-users" aria-hidden="true"></i>
            </NavLink>
            <NavLink activeClassName="btn btn-primary"
                className="nav-link"
                to={Configs.Routes.Client.ChatRoom}>
                <i className="fa fa-weixin" aria-hidden="true"></i>
            </NavLink>

            {me && me.isAdmin && (
                <Fragment>
                    {/* admin tools */}
                    <NavLink activeClassName="btn btn-primary"
                        className="nav-link border-top"
                        to={Configs.Routes.Client.Notices}>
                        <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                    </NavLink>
                    <NavLink activeClassName="btn btn-primary"
                        className="nav-link"
                        to="/controlPanel/admin/whatever">
                        <svg className="bi me-2" width="16" height="16"></svg>
                    </NavLink>
                </Fragment>
            )}

            <Button
                variant="outline-danger"
                onClick={context.signOut}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Button>
        </Row>
    );
};

export default CollapsedPanel;
