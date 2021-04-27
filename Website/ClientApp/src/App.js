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
import { BrowserRouter as Router, Switch } from 'react-router-dom';  

import StandardRoute from './components/Layout/Layout';
import DocumentationRoute from './components/Layout/DocumentationLayout';

import { Home } from './components/Pages/Home';
import { About } from './components/Pages/About';
import { Documentation } from './components/Pages/Documentation';
import { Donate } from './components/Pages/Donate';
import { License } from './components/Pages/License';
import { Install } from './components/Pages/Install';

import configData from "./config.json";

import './custom.css'

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: configData["GTM_TAG_ID"]
}

TagManager.initialize(tagManagerArgs)

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <Router>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>TxFileSystem</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="canonical" href="http://txfilesystem.io" />
                    <link rel="canonical" href="https://www.txfilesystem.io" />
                    <link rel="canonical" href="http://www.txfilesystem.io" />
                </Helmet>
                <StandardRoute exact path='/' component={Home} />
                <StandardRoute path='/install' component={Install} />
                <DocumentationRoute path='/docs' component={Documentation} />
                <StandardRoute path='/donate' component={Donate} />
                <StandardRoute path='/license' component={License} />
                <StandardRoute path='/about' component={About} />
            </Router>
        );
    }
}
