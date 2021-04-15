/**
 *
 * The code is this file is subject to EQX Proprietary License. Therefor it is copyrighted and restricted
 * from being copied, reproduced or redistributed by any party or indiviual other than the original
 * copyright holder mentioned below.
 *
 * It's also not allowed to copy or redistribute the compiled binaries without explicit consent.
 *
 * (c) 2021 EQX Media B.V. - All rights are stricly reserved.
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
                { Url: '/',        Label: 'Home' },
                { Url: '/install', Label: 'Install' },
                { Url: '/donate', Label: 'Donate' },
                { Url: '/about',   Label: 'About' }
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
                        <NavItem className={className}>
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
