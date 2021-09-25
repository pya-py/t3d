import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import "./controlpanel.css";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../dashboard/actions";
import { withRouter } from "react-router";
import { Fragment } from "react";
const PanelMenu = (props) => {
    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const signMeOut = () => {
        dispatch(SignOut());
        props.history.replace("/"); //what the f is wrong
    };

    return (
        <Row //bg-transparent
            className="panelSideBar mt-2 bg-dark text-right d-flex flex-column mx-auto flex-shrink-0 p-3">
            <NavLink
                to="/controlPanel"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">
                    <i className="fa fa-cogs px-2" aria-hidden="true"></i>
                    پنل کاربری
                </span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/controlPanel/info"
                        className="nav-link"
                        aria-current="page">
                        <i className="fa fa-user-o px-3" aria-hidden="true"></i>
                        مشخصات
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link link-dark"
                        to="/controlPanel/friends">
                        <i className="fa fa-users px-3" aria-hidden="true"></i>
                        دوستان
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link link-dark"
                        to="/controlPanel/games">
                        
                        <i
                                    className="fa fa-trophy px-2"
                                    aria-hidden="true"></i>
                        بازی ها
                    </NavLink>
                </li>
                <hr />
                {player && player.isAdmin && (
                    <Fragment>
                        {/* admin tools */}
                        <li>
                            <NavLink
                                className="nav-link link-dark"
                                to="/controlPanel/admin/notices">
                                <i
                                    className="fa fa-newspaper-o px-3"
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
                        </li>{" "}
                    </Fragment>
                )}
            </ul>
            <hr />
            <Button variant="outline-danger" onClick={signMeOut}>
                <i className="fa fa-sign-out px-3" aria-hidden="true"></i>
                خروج از حساب کاربری
            </Button>
        </Row>
    );
};

export default withRouter(PanelMenu);
