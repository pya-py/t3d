import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import "../profile.css";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../../dashboard/actions";
import { withRouter } from "react-router";
import { Fragment } from "react";
import Configs from "../../services/configs";

const ProfilePanel = (props) => {
    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const signMeOut = () => {
        dispatch(SignOut());
        props.history.replace("/"); //what the f is wrong
    };

    return (
            <Row className="profile-panel-sidebar d-flex flex-column flex-shrink-0">
                <Button
                    style={{ border: "none" }}
                    variant="outline-warning"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <i className="fa fa-cogs px-2" aria-hidden="true"></i>
                    پنل کاربری
                </Button>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink
                            exact
                            to={Configs.Routes.Client.Profile}
                            className="nav-link"
                            aria-current="page">
                            <i
                                className="fa fa-user-o px-2"
                                aria-hidden="true"></i>
                            مشخصات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="nav-link link-dark"
                            to={Configs.Routes.Client.MyGamesAndFriends}>
                            <i
                                className="fa fa-users px-2"
                                aria-hidden="true"></i>
                            دوستان و بازی ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="nav-link link-dark"
                            to={Configs.Routes.Client.ChatRoom}>
                            <i
                                className="fa fa-weixin px-2"
                                aria-hidden="true"></i>
                            چت روم
                        </NavLink>
                    </li>
                    <hr />
                    {player && player.isAdmin && (
                        <Fragment>
                            {/* admin tools */}
                            <li>
                                <NavLink
                                    className="nav-link link-dark border-top"
                                    to={Configs.Routes.Client.Notices}>
                                    <i
                                        className="fa fa-newspaper-o px-2"
                                        aria-hidden="true"></i>
                                    اطلاعیه ها
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link link-dark"
                                    to="/controlPanel/admin/whatever">
                                    <svg
                                        className="bi me-2"
                                        width="16"
                                        height="16"></svg>
                                    امکانات ادمین
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
                <hr />
                <Button variant="outline-danger" onClick={signMeOut}>
                    <i className="fa fa-sign-out px-2" aria-hidden="true"></i>
                    خروج از حساب کاربری
                </Button>
            </Row>
    );
};

export default withRouter(ProfilePanel);
