import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


import { logUserOut } from "../actions/auth_actions";
import logo from "../assets/img/fastbee-logo.png";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const toggleButton = () => setOpen(!dropdownOpen);
  const toggle = () => setIsOpen(!isOpen);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logUserOut());
  };
  const renderLogin = () => {
    if (auth.isAuth) {
      return (
        <>
        <NavLink href="/">Aide</NavLink>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggleButton} >
          <DropdownToggle color="link" caret>Bienvenue {auth.profile.name}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </>
      );
    }
    return (
      <>
        <Link className="nav-link" to={{
            pathname: '/login',
            state: 'ambassador'
          }}>Espace embassadrice</Link>
        <Link className="nav-link" to={{
            pathname: '/login',
            state: 'brand'
          }}>Espace marque</Link>
      </>
    );
  };

  return (
    <Navbar light expand="md">
      <NavbarBrand href="/">
        <img src={logo} alt="Fast Bee" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem className="navLeft">
            <NavLink href="/">Nos marques</NavLink>
            <NavLink href="/contact">Nos ambassadrcies</NavLink>
            <NavLink href="/">A propos</NavLink>
          </NavItem>
          <NavItem className="navRight">
            <NavLink href="/contact">Contact</NavLink>
             {renderLogin()}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export { NavBar };
