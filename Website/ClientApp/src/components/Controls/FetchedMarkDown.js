/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

import './FetchedMarkDown.css';

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={vs} language={language} children={value} />
    }
}

export class FetchedMarkDown extends Component {

    constructor(props) {
        super(props);

        this.state = { contents: null, sectionClass: "fetched-markdown " + this.props.sectionClass }
    }

    componentWillMount() {
        fetch(this.props.markDownUrl)
            .then((response) => response.text()).then((text) => {
                this.setState({ contents: text })
            })
    }

    render() {
        return (
            <section class={this.state.sectionClass}>
                <ReactMarkdown renderers={renderers} source={this.state.contents} />
            </section>
        );
    }

}
