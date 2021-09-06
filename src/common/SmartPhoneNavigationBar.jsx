import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MainContext from "./MainContext";

const SmartPhoneNavigationBar = () => {
  const context = useContext(MainContext);

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
                  activeClassName="btn-outline-secondary text-dark"
                >
                  صفحه اصلی
                </NavLink>
              </li>
              <li className="nav-item ml-2">
                <NavLink
                  className="nav-link text-primary"
                  to="/theGame"
                  activeClassName="btn-outline-secondary text-dark"
                >
                  بازی ها
                </NavLink>
              </li>
              <li className="nav-item ml-2">
                <NavLink
                  className="nav-link text-primary"
                  to="/ranking"
                  activeClassName="btn-outline-secondary text-dark"
                >
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
                  activeClassName="btn-outline-secondary text-dark"
                >
                  قوانین
                </NavLink>
              </li>
              <li className="nav-item ml-2">
                <NavLink
                  className="nav-link text-primary"
                  to="/contactInfo"
                  activeClassName="btn-outline-secondary text-dark"
                >
                  تماس با ما
                </NavLink>
              </li>
              <li className="nav-item ml-2">
                {context.player ? (
                  <NavLink
                    className="navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5"
                    to="/controlPanel"
                  >
                    کنترل پنل
                  </NavLink>
                ) : (
                  <NavLink
                    className="navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5"
                    to="/signUp"
                  >
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
