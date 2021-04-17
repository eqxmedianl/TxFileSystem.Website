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

    render() {

        return (
            // TODO: need to add fetch and render logic to list the sponsors that donated.
            <section className="donors">
                <h2>Donors</h2>
                <div className="alert alert-danger">
                    <strong>FIXME</strong> The list of donors should still be designed and implemented.
                </div>
            </section>
        );

    }
}
