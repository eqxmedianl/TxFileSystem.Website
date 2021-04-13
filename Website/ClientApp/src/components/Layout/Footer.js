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

import './Footer.css';

export class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <footer class="page-footer footer border-top w-100 p-2 bg-dark">
                <div class="container text-center">
                    <span class="text-muted d-block d-md-inline">&copy; 2021 <a class="text-muted footer-link" href="https://www.eqx-media.nl/" target="_blank">EQX Media B.V.</a> All rights reserved.</span><span class="d-none d-md-inline text-muted">&nbsp;&#9733;&nbsp;</span>
                    <span class="text-muted d-block d-md-inline">Read the <a class="text-muted footer-link" href="/license">EQX&nbsp;Proprietary&nbsp;License</a>.</span><span class="d-none d-md-inline text-muted">&nbsp;&#9733;&nbsp;</span>
                    <span class="text-muted d-block d-md-inline">View the proprietary <a class="text-muted footer-link" href="https://github.com/eqxmedianl/TxFileSystem.Website" target="_blank">source on GitHub.</a></span>
                </div>
            </footer>
        );
    }
}