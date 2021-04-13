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
import { Helmet } from "react-helmet";
import { Readme } from "./Readme";

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <Readme markDownUrl="https://raw.githubusercontent.com/eqxmedianl/EQXMedia.TxFileSystem/main/Readme.md" />
            </div>
        );
    }
}
