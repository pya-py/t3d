import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    const player = useSelector((state) => state.player);

    return (
        // 2. link items theme: make theme better

        <nav className="navbar navbar-expand-lg nav-pills navbar-light bg-light text-right">
            <div className="container text-right">
                {/* <NavLink className="navbar-brand" to="#">نام بازیکن</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="expand" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="navbar-expand" id="navbarResponsive">
                    <ul className="navbar-nav text-primary">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-primary"
                                to="/"
                                exact
                                activeClassName="btn-outline-secondary text-dark">
                                <i
                                    className="fa fa-home px-2"
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
                                    className="fa fa-gamepad px-2"
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
                                    className="fa fa-list-ol px-2"
                                    aria-hidden="true"></i>
                                رنکینگ
                            </NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink
                                className="nav-link text-primary"
                                to="/gameRules"
                                activeClassName="btn-outline-secondary text-dark">
                                <i
                                    className="fa fa-eye px-2"
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
                                    className="fa fa-phone-square px-2"
                                    aria-hidden="true"></i>
                                تماس با ما
                            </NavLink>
                        </li>
                    </ul>
                    {/* how to float search bar to right? */}
                </div>
            </div>
            {player ? (
                <NavLink
                    style={{ float: "left" }}
                    className="navItems nav-link btn btn-outline-success"
                    to="/controlPanel">
                    <i className="fa fa-cogs px-2" aria-hidden="true"></i>
                    کنترل پنل
                </NavLink>
            ) : (
                <NavLink
                    style={{ float: "left" }}
                    className="navItems nav-link btn btn-outline-success"
                    to="/signUp">
                        <i className="fa fa-address-card px-2" aria-hidden="true"></i>
                    ثبت نام
                </NavLink>
            )}

        </nav>
    );
};

export default NavigationBar;
