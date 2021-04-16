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

export class License extends Component {
    static displayName = License.name;

    render() {
        return (
            <div class="h-100 sx-auto">
                <Helmet>
                    <title>TxFileSystem License</title>
                    <meta name="description" content="The EQX Proprietary License is applicable to TxFileSystem and displayed on this page" />
                </Helmet>
                <pre class="h-100">
                    <FetchedMarkDown sectionClass="license-md"
                        markDownUrl="https://raw.githubusercontent.com/eqxmedianl/TxFileSystem.Website/main/License.md" />
                </pre>
            </div>
        );
    }

}
