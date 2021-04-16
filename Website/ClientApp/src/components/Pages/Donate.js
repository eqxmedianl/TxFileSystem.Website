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
import DonorsListing from '../Controls/DonorsListing';
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from 'react-bootstrap/Toast'

import './Donate.css';

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
            paymentStatus: null,
            donatedWhen: 'just now'
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
                
        if ((this.state.paymentId == null && this.state.paymentStatus == null) || this.state.paymentStatus == 'paid') {

            let toast = '';
            if (this.state.paymentStatus === 'paid') {
                toast = <Toast style={{ position: 'absolute', top: '4rem', right: '2rem' }} autohide="true"
                    delay="5000">
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Donation</strong>
                        <small>{this.state.donatedWhen}</small>
                    </Toast.Header>
                    <Toast.Body>Thanks for making a donation.</Toast.Body>
                </Toast>;
            }

            title = "Make a donation for TxFileSystem";
            contents = <main>
                {toast}
                <article>
                    <h1>Donate to support TxFileSystem Development</h1>
                    <p><acronym title="Transactional FileSystem">TxFileSystem</acronym> is a completely free .NET library, licensed
                        under the BSD license, and will remain licensed in this manner and always stay free of charge.</p>
                    <p>In short, this means you can download it and install it to your coorporate and community projects, and
                    start using it to improve your application with. Using it one can maintain data integrity, even when
                        there is a need for classic file IO.</p>
                    <p>All design and development of this free .NET library takes place in time funded by us. We are EQX Media B.V.,
                        a <i>Software Development House & Marketing Agency</i> from The Netherlands.</p>
                    <p>To reduce our costs for the development of this OpenSource project and/or express your gratitude you can
                        make a donation. Donations are very welcome! We thank you for your kindness upfront.</p>
                    <p>When you choose to make a donation you get the chance the enter details about you or your company. That
                        information you supply will be listed below.</p>
                </article>
                <DonateButtonBar onDonate={this.handleDonate} />
                <DonorsListing />
            </main>;

        }
        else if (this.state.paymentId != null && this.state.paymentStatus === 'open') {

            title = "Finish donating to TxFileSystem";
            contents = <div>
                <button onClick={e => this.finishPayment(e, this.state.paymentId)}>
                    Finish the {this.state.paymentStatus} payment
                </button>
            </div>;

        }
        else if (this.state.paymentId != null && this.state.paymentStatus != null && this.state.paymentStatus != 'paid') {

            title = "Failed to donate to TxFileSystem";
            contents = <div>
                <strong>Payment Id:</strong><br />
                {this.state.paymentId}<br />
                <br />
                <strong>Payment Status:</strong><br />
                {this.state.paymentStatus}<br />
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

                const cookies = new Cookies();
                cookies.remove('transaction_id', { path: '/donate' });

                this.setState({
                    paymentId: paymentStatusResult.paymentId,
                    paymentStatus: paymentStatusResult.status
                });
            });
    }
}
