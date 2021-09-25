import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SmartPhoneNavigationBar = () => {
    const player = useSelector((state) => state.player);
    return (
        // 2. link items theme: make theme better

        <nav className="navbar navbar-expand-lg nav-pills navbar-light bg-light text-right">
            <div className="container text-right">
                <div className="navbar-expand w-100" id="navbarResponsive">
                    <ul className="navbar-nav text-primary">
                        <div className="row">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/"
                                    exact
                                    activeClassName="btn-outline-secondary text-dark">
                                    <i
                                        className="fa fa-home px-1"
                                        aria-hidden="true"></i>
                                    صفحه اصلی
                                </NavLink>
                            </li>
                            <li className="nav-item ml-2">
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/gameDeck"
                                    activeClassName="btn-outline-secondary text-dark">
                                    <i
                                        className="fa fa-gamepad px-1"
                                        aria-hidden="true"></i>
                                    بازی ها
                                </NavLink>
                            </li>
                            <li className="nav-item ml-2">
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/ranking"
                                    activeClassName="btn-outline-secondary text-dark">
                                    <i
                                        className="fa fa-list-ol px-1"
                                        aria-hidden="true"></i>
                                    رنکینگ
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                    <hr />
                    <ul className="navbar-nav text-primary">
                        <div className="row">
                            <li className="nav-item ml-2">
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/gameRules"
                                    activeClassName="btn-outline-secondary text-dark">
                                    <i
                                        className="fa fa-eye px-1"
                                        aria-hidden="true"></i>
                                    قوانین
                                </NavLink>
                            </li>
                            <li className="nav-item ml-2">
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/contactInfo"
                                    activeClassName="btn-outline-secondary text-dark">
                                    <i
                                        className="fa fa-phone-square px-1"
                                        aria-hidden="true"></i>
                                    تماس با ما
                                </NavLink>
                            </li>
                            <li className="nav-item ml-2">
                                {player ? (
                                    <NavLink
                                        className="navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5"
                                        to="/controlPanel">
                                        <i
                                            className="fa fa-cogs px-1"
                                            aria-hidden="true"></i>
                                        کنترل پنل
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        className="navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5"
                                        to="/signUp">
                                          <i className="fa fa-address-card px-1" aria-hidden="true"></i>
                                        ثبت نام
                                    </NavLink>
                                )}
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SmartPhoneNavigationBar;
