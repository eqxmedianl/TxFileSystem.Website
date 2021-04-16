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

export class About extends Component {
    static displayName = About.name;

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
