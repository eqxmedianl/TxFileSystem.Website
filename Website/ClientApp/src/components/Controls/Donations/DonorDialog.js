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
import { Container, Row, Col} from 'react-bootstrap';

export default class DonorDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            url: null
        };

        this.onOmit = this.onOmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onOmit() {
        this.props.onOmit();
    }

    onSubmit() {
        this.props.onSubmit(this.state.name, this.state.url);
    }

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
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter a name"
                                onChange={e => this.setState({ name: e.target.value })} />
                            <Form.Text className="text-muted">
                                When supplied this name will be listed on the donate page
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="url" placeholder="https://www.example.com/"
                                onChange={e => this.setState({ url: e.target.value })} />
                            <Form.Text className="text-muted">
                                When supplied we will link to this website on the donate page
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col>
                                <Button className="float-left" onClick={this.onOmit}>Omit</Button>
                            </Col>
                            <Col>
                                <Button className="float-right" onClick={this.onSubmit}>Submit</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        );
    }

}
