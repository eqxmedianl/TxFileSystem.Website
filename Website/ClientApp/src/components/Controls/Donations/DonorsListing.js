/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

export default class DonorsListing extends Component {
    static displayName = DonorsListing.name;

    constructor(props) {
        super(props)

        this.state = { loading: true, donors: [] }

        this.seperateDonors = this.seperateDonors.bind(this);

        this.fetchDonors();
    }

    fetchDonors() {
        fetch('donations/donors',
            {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.text())
            .then(data => {
                let result = JSON.parse(data);

                this.setState({ loading: false, donors: result.donors });
            });
    }

    listDonor(donor) {
        if (donor.url === null) {
            return (donor.name)
        }
        return (<a href={donor.url}>{donor.name}</a>)
    }

    renderDonorsListing() {
        return (
            <div>
                <p>The following donors were kind enough to make a donation:</p>
                <div>{
                this.state.donors.map((donor, i) => <span key={i}>
                    {i > 0 && this.seperateDonors(i, this.state.donors.length)}
                    {this.listDonor(donor)}
                </span>)
                }</div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.donors.length > 0
                ? this.renderDonorsListing()
                : <p><em>You can be the first donor.</em></p>;

        return (
            <section className="donors" id="donors">                
                <h2>Donors</h2>
                {contents}
            </section>
        );

    }

    seperateDonors(i, total) {
        if (i + 1 < total) {
            return (", ")
        }
        else if (i + 1 === total) {
            return (" and ")
        }
    }
}
