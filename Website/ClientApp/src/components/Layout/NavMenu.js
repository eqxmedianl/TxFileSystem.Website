/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            menuItems: [
                { Key: 'home',           Url: '/',        Label: 'Home' },
                { Key: 'install',        Url: '/install', Label: 'Install' },
                { Key: 'documentation',  Url: '/docs',    Label: 'Documentation' },
                { Key: 'donate',         Url: '/donate',  Label: 'Donate' },
                { Key: 'about',          Url: '/about',   Label: 'About' }
            ],
            active: null
        };
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    _handleClick(menuItem) {
        this.setState({ active: menuItem });
    }

    render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-dark bg-dark">
          <Container>
            <NavbarBrand tag={Link} to="/">TxFileSystem</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {this.state.menuItems.map((menuItem) => {

                    let className = "text-white";
                    if (this.state.active === menuItem || (this.state.active === null && menuItem.Url === window.location.pathname)) {
                        className += " nav-item-active";
                    }

                    return (
                        <NavItem className={className} key={menuItem.Key}>
                            <NavLink tag={Link} to={menuItem.Url} onClick={this._handleClick.bind(this, menuItem)}
                                className="text-white">
                                {menuItem.Label}</NavLink>
                        </NavItem>
                        )
                })}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
