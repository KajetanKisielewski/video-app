import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import VideoContext from '../../context/VideoContext';

import './navBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const videoContext = React.useContext(VideoContext);

    const toggle = () => setIsOpen(!isOpen);

    const showFavoriteVideos = (e) => {
        e.preventDefault();
        videoContext.setFavorite(true);
    };

    const showAllVideos = (e) => {
        e.preventDefault();
        videoContext.setFavorite(false);
    };

    return (
        <Navbar className="nav" color="dark" dark expand="md" sticky="top">
            <NavbarBrand href="/">Video App</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            className="nav__link nav__link--all"
                            href="/"
                            onClick={showAllVideos}
                        >
                            Wszystkie filmy
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav__link nav__link--favourite"
                            href="/"
                            onClick={showFavoriteVideos}
                        >
                            Ulubione
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
