/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';  
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class DocumentationLayout extends Component {
  static displayName = DocumentationLayout.name;

  render () {
    return (
      <div className="d-flex flex-column vh-100">
        <NavMenu />
        <div className="flex-grow-1">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

const DocumentationRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <DocumentationLayout>
                <Component {...matchProps} />
            </DocumentationLayout>
        )} />
    )
};

export default DocumentationRoute;
