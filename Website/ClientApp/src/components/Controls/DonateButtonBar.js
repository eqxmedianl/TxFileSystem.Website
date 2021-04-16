/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

import DonateButton from './DonateButton';

export default class DonateButtonBar extends Component {

    constructor(props) {
        super(props);

        this.state = { currency: 'EUR' };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(amount) {
        this.props.onDonate(amount);
    }

    render() {
        return (
            <section className="btnbar-donate">
                <h2>Donate</h2>
                <div class="btn-group btn-group-donate">
                    <DonateButton amount="10" currency={this.state.currency} onDonate={this.handleClick} />
                    <DonateButton amount="20" currency={this.state.currency} onDonate={this.handleClick} />
                    <DonateButton amount="50" currency={this.state.currency} onDonate={this.handleClick} />
                    <DonateButton amount="100" currency={this.state.currency} onDonate={this.handleClick} />
                </div>
            </section>
        );
    }

}
