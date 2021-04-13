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
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={dark} language={language} children={value} />
    }
}

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props)

        this.state = { terms: null }
    }

    componentWillMount() {
        fetch("https://raw.githubusercontent.com/eqxmedianl/EQXMedia.TxFileSystem/main/Readme.md")
            .then((response) => response.text()).then((text) => {
                this.setState({ terms: text })
            })
    }


    render () {
        return (
            <div>
                <Helmet>
                    <title>TxFileSystem - OpenSource .NET library</title>
                    <meta name="description" content="TxFileSystem is a transactional filesystem wrapper using the .NET filesystem abstraction from System.IO.Abstractions" />
                </Helmet>
                <section class="readme-md">
                    <ReactMarkdown renderers={renderers} source={this.state.terms} />
                </section>
            </div>
        );
    }
}
