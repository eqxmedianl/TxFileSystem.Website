/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export default class DonorDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            name: null,
            url: null
        };

        this.onOmit = this.onOmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onOmit() {
        this.props.onOmit();
    }

    onSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ validated: true });

            return;
        }

        this.props.onSubmit(this.state.email, this.state.name, this.state.url);
    }

    render() {
        return (
            <Modal
                show={this.props.donateShown}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Make a donation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Donor details</h4>
                            <Form.Text>
                                Once paid the information entered below will be listed on the donate page.
                            </Form.Text>

                            <Form.Text className="text-muted">
                                Press Omit to make a donation anonymously.
                                <br />
                                <br />
                            </Form.Text>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Enter a name"
                                    onChange={e => this.setState({ name: e.target.value })}
                                    required />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please supply a valid name
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    When supplied this name will be listed on the donate page
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="donor@example.com"
                                    onChange={e => this.setState({ email: e.target.value })}
                                    required />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please supply a valid email address
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    This is required to be able to uniquely identify you
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="url">
                                <Form.Label>URL</Form.Label>
                                <Form.Control type="url" placeholder="https://www.example.com/"
                                    onChange={e => this.setState({ url: e.target.value })}
                                    required />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please supply a valid internet address
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    When supplied we will link to this website on the donate page
                                </Form.Text>
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Container>
                            <Row>
                                <Col>
                                    <Button className="float-left" onClick={this.onOmit}>Omit</Button>
                                </Col>
                                <Col>
                                    <Button className="float-right"
                                        variant="primary" type="submit">Submit</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }

}
