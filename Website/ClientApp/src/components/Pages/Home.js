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
