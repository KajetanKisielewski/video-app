import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import './navBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="nav" color="dark" dark expand="md" sticky="top">
            <NavbarBrand href="/">Video App</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav__link nav__link--all" href="/">
                            Wszystkie filmy
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav__link nav__link--favourite" href="/">
                            Ulubione
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
