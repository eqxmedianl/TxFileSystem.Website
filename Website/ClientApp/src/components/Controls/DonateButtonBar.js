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

import DonateButton from './DonateButton';

export default class DonateButtonBar extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(amount) {
        this.props.onDonate(amount);
    }

    render() {
        return (
            <div className="btnbar-donate">
                <DonateButton amount="10" onDonate={this.handleClick} />
                <DonateButton amount="20" onDonate={this.handleClick} />
                <DonateButton amount="50" onDonate={this.handleClick} />
                <DonateButton amount="100" onDonate={this.handleClick} />
            </div>
        );
    }

}
