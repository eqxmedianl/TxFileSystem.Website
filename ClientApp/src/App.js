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
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Install } from './components/Install';

import './custom.css'

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-PDTXLVJ'
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
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Route exact path='/' component={Home} />
            <Route path='/install' component={Install} />
        </Layout>
    );
  }
}
