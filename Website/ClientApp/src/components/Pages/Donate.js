/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import Helmet from "react-helmet";
import uuid from 'react-uuid'
import Cookies from 'universal-cookie';

import DonateButtonBar from '../Controls/DonateButtonBar';

// FIXME: WIP needs heavy lifting.
export class Donate extends Component {
    static displayName = Donate.name;

    constructor(props) {
        super(props)

        this.handleDonate = this.handleDonate.bind(this);

        const cookies = new Cookies();
        let transaction_id = cookies.get('transaction_id');
        if (typeof transaction_id == 'undefined') {
            transaction_id = null;
        }
        
        this.state = {
            loading: true,
            transaction_id: transaction_id,
            paymentId: null,
            paymentStatus: null
        };

        if (this.state.transaction_id != null) {
            this.updateState();
            return;
        }
    }

    componentDidMount() {
    }

    doDonate(amount) {
        console.log("Starting to donate " + amount + " EUR");

        let data = {
            amount: amount,
            uuid: uuid()
        };

        fetch('donations/donate',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(data => {
                let pendingDonation = JSON.parse(data);

                const cookies = new Cookies();
                cookies.set('transaction_id', pendingDonation.transactionId, { path: '/donate' });
                cookies.set('checkout_url', pendingDonation.checkoutUrl, { path: '/donate' });

                window.location.href = pendingDonation.checkoutUrl;
            });
    }

    finishPayment(e, paymentId) {
        e.preventDefault();
        console.log("Finishing donation");
        const cookies = new Cookies();
        let checkout_url = cookies.get('checkout_url');
        if (typeof checkout_url != 'undefined') {
            window.location.href = checkout_url;
        }
    }

    handleDonate(amount) {
        this.doDonate(amount);
    }

    render() {
        let title;
        let contents;

        if (this.state.donated) {
            title = "Thanks for donating to TxFileSystem";
            contents = <div>
                Thanks for your donation<br />
                <br />
                <DonateButtonBar onDonate={this.handleDonate} />
            </div>;
        }
        else if (this.state.paymentId != null && this.state.paymentStatus === 'open') {
            title = "Finish donating to TxFileSystem";
            contents = <div>
                <button onClick={e => this.finishPayment(e, this.state.paymentId)}>
                    Finish the {this.state.paymentStatus} payment
                </button>
            </div>;
        }
        else if (this.state.paymentId != null && this.state.paymentStatus != null) {
            title = "Failed to donate to TxFileSystem";
            contents = <div>
                <strong>Payment Id:</strong><br />
                {this.state.paymentId}<br />
                <br />
                <strong>Payment Status:</strong><br />
                {this.state.paymentStatus}<br />
            </div>;
        }
        else {
            title = "Make a donation for TxFileSystem";
            contents = <div>
                <DonateButtonBar onDonate={this.handleDonate} />
            </div>;
        }

        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content="Thank for and/or donate to the development of the OpenSource .NET Library TxFileSystem" />
                </Helmet>
                {contents}
            </div>
        );
    }

    updateState() {
        let data = {
            transactionId: this.state.transaction_id
        };
        let body = JSON.stringify(data);

        fetch('donations/state',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: body
            })
            .then(response => response.text())
            .then(data => {
                let paymentStatusResult = JSON.parse(data);

                let donated = (paymentStatusResult.status === 'paid');

                const cookies = new Cookies();
                cookies.remove('transaction_id', { path: '/donate' });

                this.setState({
                    donated: donated,
                    paymentId: paymentStatusResult.paymentId,
                    paymentStatus: paymentStatusResult.status
                });
            });
    }
}
