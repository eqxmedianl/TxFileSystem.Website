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
import { Helmet } from "react-helmet";
import uuid from 'react-uuid'
import Cookies from 'universal-cookie';

// FIXME: WIP needs heavy lifting.
export class Donate extends Component {
    static displayName = Donate.name;

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);

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

    handleClick(e, amount) {
        e.preventDefault();
        console.log("Starting to donate " + amount + " EUR");
        this.doDonate(amount);
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

    componentDidMount() {
    }

    render() {
        let title;
        let contents;

        if (this.state.donated) {
            title = "Thanks for donating to TxFileSystem";
            contents = <div>
                Thanks for your donation<br />
                <br />
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 10)}>
                        Donate 10 EUR
                    </a>
                </div>
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 20)}>
                        Donate 20 EUR
                        </a>
                </div>
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 50)}>
                        Donate 50 EUR
                        </a>
                </div>
            </div>;
        }
        else if (this.state.paymentId != null && this.state.paymentStatus == 'open') {
            title = "Finish donating to TxFileSystem";
            contents = <div>
                <a href="#" onClick={e => this.finishPayment(e, this.state.paymentId)}>
                    Finish the {this.state.paymentStatus} payment
                </a>
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
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 10)}>
                        Donate 10 EUR
                    </a>
                </div>
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 20)}>
                        Donate 20 EUR
                        </a>
                </div>
                <div>
                    <a href="#" onClick={e => this.handleClick(e, 50)}>
                        Donate 50 EUR
                        </a>
                </div>
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
            }).
            then(response => response.text())
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

    doDonate(amount) {
        let data = {
            amount: amount,
            uuid: uuid()
        };

        fetch('donations/donate',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).
            then(response => response.text())
            .then(data => {
                let pendingDonation = JSON.parse(data);

                const cookies = new Cookies();
                cookies.set('transaction_id', pendingDonation.transactionId, { path: '/donate' });
                cookies.set('checkout_url', pendingDonation.checkoutUrl, { path: '/donate' });

                window.location.href = pendingDonation.checkoutUrl;
            });
    }
}