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

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <Helmet>
                    <title>TxFileSystem Project - OpenSource .NET Library</title>
                    <meta name="description" content="EQXMedia.TxFileSystem is a transactional filesystem wrapper using the .NET filesystem abstraction from System.IO.Abstractions" />
                </Helmet>
                <FetchedMarkDown sectionClass="readme-md"
                    markDownUrl="https://raw.githubusercontent.com/eqxmedianl/EQXMedia.TxFileSystem/main/Readme.md" />
            </div>
        );
    }
}
