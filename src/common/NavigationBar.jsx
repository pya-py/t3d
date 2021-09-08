import { useContext } from "react";
import { NavLink } from "react-router-dom";
import MainContext from "./MainContext";

const NavigationBar = () => {
  const context = useContext(MainContext);
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
                to="t3d/"
                
                activeClassName="btn-outline-secondary text-dark"
              >
                صفحه اصلی
              </NavLink>
            </li>
            <li className="nav-item ml-2">
              <NavLink
                className="nav-link text-primary"
                to="/gameDeck"
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
          </ul>
          {/* how to float search bar to right? */}
        </div>
      </div>
      {context.player ? (
        <NavLink
          style={{ float: "left" }}
          className="navItems nav-link btn btn-outline-success btn-sm"
          to="/controlPanel"
        >
          کنترل پنل
        </NavLink>
      ) : (
        <NavLink
          style={{ float: "left" }}
          className="navItems nav-link btn btn-outline-success btn-sm"
          to="/signUp"
        >
          ثبت نام
        </NavLink>
      )}

      {/* <form class="searchForm form-inline">
                    <input class=" form-control mr-sm-2 bg-dark" type="search" placeholder="دنبال چی می گردی؟" aria-label="Search" />
                    <button class=" btn btn-outline-warning fa fa-search" type="submit"></button>
            </form> */}
    </nav>
  );
};

export default NavigationBar;
