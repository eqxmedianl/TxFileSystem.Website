/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

import './Footer.css';

export class Footer extends Component {

    render() {
        return (
            <footer className="page-footer footer border-top w-100 p-2 bg-dark">
                <div className="container text-center">
                    <span className="text-muted d-block d-md-inline">&copy; 2021 <a className="text-muted footer-link" href="https://www.eqx-media.nl/" target="_blank" rel="noopener noreferrer">EQX Media B.V.</a> All rights reserved.</span><span className="d-none d-md-inline text-muted">&nbsp;&#9733;&nbsp;</span>
                    <span className="text-muted d-block d-md-inline">Read the <a className="text-muted footer-link" href="/license">License</a>.</span><span className="d-none d-md-inline text-muted">&nbsp;&#9733;&nbsp;</span>
                    <span className="text-muted d-block d-md-inline">View the <a className="text-muted footer-link" href="https://github.com/eqxmedianl/TxFileSystem.Website" target="_blank" rel="noopener noreferrer">source on GitHub.</a></span>
                </div>
            </footer>
        );
    }

}