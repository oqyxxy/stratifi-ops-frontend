import React from 'react';

import '../styles-local/Header.css';
import logo from '../styles/dist/img/logo.svg';


export default props => (
  <nav className="navbar navbar-static-top navbar-dark flex align-stretch justify-between bg-inverse">
    <div className="flex justify-start align-center">
      <a href="http://stratifi.com" className="navbar-brand flex align-center">
        <div className="nav-image-wrapper">
          <img src={logo} role="presentation" className="logo" />
        </div>
      </a>
    </div>
  </nav>
)
