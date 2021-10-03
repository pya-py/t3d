import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import "../profile.css";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../../dashboard/actions";
import { withRouter } from "react-router";
import { Fragment } from "react";
import Configs from "../../services/configs";

const CollapsedPanel = (props) => {
    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const signMeOut = () => {
        dispatch(SignOut());
        props.history.replace("/"); //what the f is wrong
    };

    return (
        <Row bg="light" className="profile-panel-sidebar-collapsed w-100 text-right">
            <Button
                style={{ border: "none", padding:0 }}
                variant="outline-warning"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <i className="fa fa-cogs" aria-hidden="true"></i>
            </Button>
            <NavLink
                exact
                to={Configs.Routes.Client.Profile}
                className="nav-link"
                aria-current="page">
                <i className="fa fa-user-o" aria-hidden="true"></i>
            </NavLink>
            <NavLink
                className="nav-link link-dark"
                to={Configs.Routes.Client.MyGamesAndFriends}>
                <i className="fa fa-users" aria-hidden="true"></i>
            </NavLink>
            <NavLink
                className="nav-link link-dark"
                to={Configs.Routes.Client.ChatRoom}>
                <i className="fa fa-weixin" aria-hidden="true"></i>
            </NavLink>
            <hr />
            {player && player.isAdmin && (
                <Fragment>
                    {/* admin tools */}
                    <NavLink
                        className="nav-link link-dark border-top"
                        to={Configs.Routes.Client.Notices}>
                        <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                    </NavLink>
                    <NavLink
                        className="nav-link link-dark"
                        to="/controlPanel/admin/whatever">
                        <svg className="bi me-2" width="16" height="16"></svg>
                    </NavLink>
                </Fragment>
            )}
            <hr />
            <Button
                className="text-right"
                variant="outline-danger"
                onClick={signMeOut}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Button>
        </Row>
    );
};

export default withRouter(CollapsedPanel);
