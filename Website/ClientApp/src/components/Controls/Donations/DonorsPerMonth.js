/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

export default class DonorsPerMonth extends Component {
    static displayName = DonorsPerMonth.name;

    constructor(props) {
        super(props)

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.state = {
            loading: true,
            donors: [],
            monthName: monthNames[this.props.month],
            sectionClass: 'donors-per-month donors-per-month-' + monthNames[this.props.month].toLowerCase() + this.props.year,
            sectionId: 'donors-per-month-' + monthNames[this.props.month].toLowerCase() + this.props.year
        }

        this.seperateDonors = this.seperateDonors.bind(this);

        this.fetchDonors();
    }

    fetchDonors() {
        fetch('donations/donors/' + this.props.year + '/' + this.props.month,
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

    renderListing() {
        return (
            <div>{
                this.state.donors.map((donor, i) => <span key={i}>
                    {i > 0 && this.seperateDonors(i, this.state.donors.length)}
                    {this.listDonor(donor)}
                </span>)
            }</div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p> : this.renderListing();

        let heading = <h3>{this.state.monthName} {this.props.year} </h3>;

        if (this.props.onlyMonth) {
            heading = '';
        }

        return (
            <section className={this.state.sectionClass} id={this.state.sectionId}>
                {heading}
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
