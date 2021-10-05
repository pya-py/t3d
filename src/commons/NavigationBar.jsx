import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import {Devices, Routes} from '../services/configs';

const NavigationBar = ({Device}) => {
    const player = useSelector((state) => state.player);

    return (
        <Navbar bg="light" className="nav-pills text-right">
            <Container className="text-right">
                

                    <Nav className="me-auto">
                    <NavLink
                    className="nav-link"
                    className="nav-link text-primary"
                    activeClassName="btn-success text-dark"
                    to={player ? Routes.Client.Profile : Routes.Client.SignUp}>
                    <i
                        className="fa fa-address-card px-2"
                        aria-hidden="true"></i>
                    {player ? (Device !== Devices.SmartPhone && player.fullname) : "ثبت نام"}
                </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.Root}
                            exact
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-home px-2"
                                aria-hidden="true"></i>
                           {Device === Devices.Desktop && 'صفحه اصلی'}
                        </NavLink>

                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.GameDeck}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-gamepad px-2"
                                aria-hidden="true"></i>
                            {Device === Devices.Desktop && 'بازی ها'}
                        </NavLink>
                        {player && <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.ChatRoom}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-weixin px-2"
                                aria-hidden="true"></i>
                            {Device === Devices.Desktop && 'چت روم'}
                        </NavLink>}
                        
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.Rankings}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-list-ol px-2"
                                aria-hidden="true"></i>
                            {Device === Devices.Desktop && 'رنکینگ'}
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.GameGuide}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-eye px-2"
                                aria-hidden="true"></i>
                            {Device === Devices.Desktop && 'راهنما'}
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            to={Routes.Client.ContactUs}
                            activeClassName="btn-outline-secondary text-dark">
                            <i
                                className="fa fa-phone-square px-2"
                                aria-hidden="true"></i>
                            {Device === Devices.Desktop && 'تماس با ما'}
                        </NavLink>
                        
                    </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
