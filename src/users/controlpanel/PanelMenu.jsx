import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./controlpanel.css";

const PanelMenu = (props) => {
    return (
        <div //bg-transparent
            className="mt-2 bg-dark text-right d-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{ height: "92vh", borderRadius: "15px" }}>
            <NavLink
                to="/controlPanel"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">
                    <i class="fa fa-cogs px-2" aria-hidden="true"></i>
                    پنل کاربری
                </span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/controlPanel/info"
                        className="nav-link active"
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
                        <i class="fa fa-gamepad px-3" aria-hidden="true"></i>
                        بازی ها
                    </NavLink>
                </li>
                <hr />
                <li>
                    <NavLink
                        className="nav-link link-dark"
                        to="/controlPanel/admin/notices">
                        <i class="fa fa-newspaper-o px-3" aria-hidden="true"></i>
                        اطلاعیه ها
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link link-dark"
                        to="/controlPanel/admin">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        امکانات ادمین
                    </NavLink>
                </li>
            </ul>
            <hr />
            <Button variant="outline-danger">
            <i class="fa fa-sign-out px-3" aria-hidden="true"></i>
            خروج از حساب کاربری</Button>
        </div>
    );
};

export default PanelMenu;
