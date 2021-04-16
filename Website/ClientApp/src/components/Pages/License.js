/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { FetchedMarkDown } from "../Controls/FetchedMarkDown";

export class License extends Component {
    static displayName = License.name;

    constructor(props) {
        super(props)
    }

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
