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
