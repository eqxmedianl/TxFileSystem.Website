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
import { Route } from 'react-router';

import { Layout } from './components/Layout/Layout';

import { Home } from './components/Pages/Home';
import { About } from './components/Pages/About';
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
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>TxFileSystem</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="http://txfilesystem.io" />
                <link rel="canonical" href="https://www.txfilesystem.io" />
                <link rel="canonical" href="http://www.txfilesystem.io" />
            </Helmet>
            <Route exact path='/' component={Home} />
            <Route path='/install' component={Install} />
            <Route path='/donate' component={Donate} />
            <Route path='/license' component={License} />
            <Route path='/about' component={About} />
        </Layout>
    );
}
}
