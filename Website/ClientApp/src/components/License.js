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
import { FetchedMarkDown } from "./FetchedMarkDown";

export class License extends Component {
    static displayName = License.name;

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <h1>EQX Proprietary License</h1>
                <FetchedMarkDown sectionClass="license-md"
                    markDownUrl="https://raw.githubusercontent.com/eqxmedianl/EQXMedia.TxFileSystem/main/License.md" />
            </div>
        );
    }
}
