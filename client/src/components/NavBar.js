import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import {useSelector, useDispatch } from "react-redux";
import {logUserOut} from '../actions/auth_actions';

const NavBar = (props) => {
  

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const toggleButton = () => setOpen(!dropdownOpen);
  const toggle = () => setIsOpen(!isOpen);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logUserOut());
   
  };
  const renderLoginOrLogout = () => {
    if(auth.isAuth) {
      return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggleButton}>
          <DropdownToggle caret color="link" size="sm">
            Welcome { auth.profile.name }
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    return(
      <NavItem>
         <NavLink href="/login">Login</NavLink>
      </NavItem>
    )
    
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Fast Bee</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {renderLoginOrLogout()}
           </Nav>
         </Collapse>
      </Navbar>
    </div>
  );
}

export { NavBar };