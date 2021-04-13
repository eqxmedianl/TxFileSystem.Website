import React, { Component } from 'react';
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
        <Route exact path='/' component={Home} />
        <Route path='/install' component={Install} />
      </Layout>
    );
  }
}
