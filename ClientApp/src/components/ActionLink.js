import React, { Component } from 'react';

export default class ActionLink extends Component {
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