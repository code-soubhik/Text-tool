import React from 'react';

import Nav from './NavBar';
import Logo from './Logo';
import Navlink from './Navlink';
import Container from './Container';

function Header() {
  return (
    <>
      <Nav>
        <Logo>
          <Navlink to="/">Text Tool</Navlink>
        </Logo>
      </Nav>
    </>
  );
}

export default Header;
