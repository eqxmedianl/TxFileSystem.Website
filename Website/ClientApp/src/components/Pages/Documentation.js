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

import "./Documentation.css";

export class Documentation extends Component {
    static displayName = Documentation.name;

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            content: null
        }
    }

    render() {
        return (
            <div class="h-100 w-100">
                <Helmet>
                    <title>TxFileSystem Documentation</title>
                    <meta name="description" content="Documentation of the OpenSource .NET library TxFileSystem" />
                </Helmet>
                <iframe class="h-100 w-100" src="docs/view/index" />
            </div>
        );
    }

}
