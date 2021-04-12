import React, { Component } from 'react';
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
        fetch("https://raw.githubusercontent.com/eqxmedianl/EQXMedia.TxFileSystem/main/Readme.md").then((response) => response.text()).then((text) => {
            this.setState({ terms: text })
        })
    }


    render () {
        return (
            <section class="readme-md">
                <ReactMarkdown renderers={renderers} source={this.state.terms} />
            </section>
        );
    }
}
