/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

import DonorsListingPerMonth from './DonorsListingPerMonth';

export default class DonorsListing extends Component {
    static displayName = DonorsListing.name;

    constructor(props) {
        super(props)

        this.state = { loading: true, timePeriods: [] }

        this.fetchTimePeriods();
    }

    fetchTimePeriods() {
        fetch('donations/timeperiods',
            {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.text())
            .then(data => {
                let result = JSON.parse(data);

                this.setState({ loading: false, timePeriods: result.timePeriods });
            });
    }

    renderListing() {
        let intro = '';
        let onlyMonth = false;
        if (this.state.timePeriods.length === 1) {
            intro = <p>The following donors were kind enough to make a donation this month:</p>;
            onlyMonth = true;
        }
        if (this.state.timePeriods.length > 1) {
            intro = <p>The following donors were kind enough to make a donation in the months mentioned.</p>;
        }
        return (
            <div>
                {intro}
                {
                    this.state.timePeriods.map((period, i) =>
                        <DonorsListingPerMonth key={i} month={period.month} year={period.year} onlyMonth={onlyMonth} />
                    )
                }
            </div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.timePeriods.length > 0
                ? this.renderListing()
                : <p><em>You can be the first donor.</em></p>;

        return (
            <section className="donors" id="donors">
                <h2>Donors</h2>
                {contents}
            </section>
        );

    }
}
