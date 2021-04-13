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
import { FetchedMarkDown } from "../Controls/FetchedMarkDown";

export class About extends Component {
    static displayName = About.name;

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <Helmet>
                    <title>About TxFileSystem</title>
                    <meta name="description" content="Information about the TxFileSystem project and reasoning behind the development of the OpenSource .NET Library" />
                </Helmet>
                    <FetchedMarkDown sectionClass="about-md"
                    markDownUrl="https://raw.githubusercontent.com/eqxmedianl/TxFileSystem.Website/main/About.md" />
            </div>
        );
    }
}
