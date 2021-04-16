/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

export default class VersionLink extends Component {
    constructor() {
        super()
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.props.version);
        this.props.updateVersion(this.props.version);
    }

    render() {
        return (
            <a href="#" onClick={this.handleClick}>
                {this.props.version}
            </a>
        );
    }
}