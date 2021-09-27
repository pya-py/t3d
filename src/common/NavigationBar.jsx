import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";

const NavigationBar = () => {
    const player = useSelector((state) => state.player);

    return (
        <Navbar bg="light" expand="lg" className="nav-pills text-right">
            <Container className="text-right">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <NavLink
                    border="secandary"
                    className="nav-link"
                    activeClassName="btn-success text-dark"
                    to={player ? "/controlPanel" : "/signUp"}>
                    <i
                        className="fa fa-address-card px-2"
                        aria-hidden="true"></i>
                    {player ? player.fullname : "ثبت نام"}
                </NavLink>

                <Navbar.Collapse>
                    <Nav className="me-auto">
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

                        <NavLink
                            className="nav-link text-primary"
                            to="/gameDeck"
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-gamepad px-2"
                                aria-hidden="true"></i>
                            بازی ها
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to="/ranking"
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-list-ol px-2"
                                aria-hidden="true"></i>
                            رنکینگ
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to="/gameRules"
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-eye px-2"
                                aria-hidden="true"></i>
                            قوانین
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to="/contactInfo"
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-phone-square px-2"
                                aria-hidden="true"></i>
                            تماس با ما
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
