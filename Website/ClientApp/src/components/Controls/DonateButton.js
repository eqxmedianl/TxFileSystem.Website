/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

export default class DonateButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.amount);
        this.props.onDonate(this.props.amount);
    }

    render() {
        let classNames = "btn-default btn-donate btn-donate-" + this.props.amount;
        return (
            <div className={classNames}>
                <button onClick={this.handleClick}>
                    Donate {this.props.amount}
                </button>
            </div>
        );
    }

}
