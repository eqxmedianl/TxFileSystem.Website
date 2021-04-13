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
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <footer class="footer border-top w-100 p-2">
                <div class="container text-center">
                    <span class="text-muted d-block d-md-inline">&copy; 2021 <a href="https://www.eqx-media.nl/" target="_blank">EQX Media B.V.</a> All rights reserved.</span><span class="d-none d-md-inline">&nbsp;&#9733;&nbsp;</span>
                    <span class="d-block d-md-inline">Read the <NavLink tag={Link} className="d-inline p-0" to="/license">EQX&nbsp;Proprietary&nbsp;License</NavLink>.</span><span class="d-none d-md-inline">&nbsp;&#9733;&nbsp;</span>
                    <span class="d-block d-md-inline">View the proprietary source <a href="https://github.com/eqxmedianl/TxFileSystem.Website" target="_blank">on GitHub.</a></span>
                </div>
            </footer>
        );
    }
}