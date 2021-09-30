import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import {Routes, Device} from '../services/configs';

const NavigationBar = () => {
    const player = useSelector((state) => state.player);
    const device = useSelector(state => state.device);

    return (
        <Navbar bg="light" expand="lg" className="nav-pills text-right">
            <Container className="text-right">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <NavLink
                    border="secandary"
                    className="nav-link"
                    activeClassName="btn-success text-dark"
                    to={player ? Routes.Client.Profile : Routes.Client.SignUp}>
                    <i
                        className="fa fa-address-card px-2"
                        aria-hidden="true"></i>
                    {player ? player.fullname : "ثبت نام"}
                </NavLink>

                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.Root}
                            exact
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-home px-2"
                                aria-hidden="true"></i>
                            صفحه اصلی
                        </NavLink>

                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.GameDeck}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-gamepad px-2"
                                aria-hidden="true"></i>
                            بازی ها
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.Rankings}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-list-ol px-2"
                                aria-hidden="true"></i>
                            رنکینگ
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.GameGuide}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-eye px-2"
                                aria-hidden="true"></i>
                            راهنما
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.ContactUs}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-phone-square px-2"
                                aria-hidden="true"></i>
                            تماس با ما
                        </NavLink>
                        {player && device === Device.SmartPhone && <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.ChatRoom}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-phone-square px-2"
                                aria-hidden="true"></i>
                            چت روم
                        </NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
