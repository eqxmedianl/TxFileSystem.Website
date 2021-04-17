/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default class DonorDialog extends Component {

    render() {
        return (
            <Modal
                show={this.props.donateShown}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Make a donation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Donor details</h4>
                    <div className="alert alert-danger">
                        <strong>TODO</strong> The donors should be able to add details about themselves here.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onDonorSubmitted}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
