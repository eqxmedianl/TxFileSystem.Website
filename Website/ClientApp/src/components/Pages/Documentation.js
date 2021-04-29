/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import $ from 'jquery'

import "./Documentation.css";

const defaultTitle = "TxFileSystem Documentation";

export class Documentation extends Component {
    static displayName = Documentation.name;

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            content: null,
            topicTitle: defaultTitle,
            topicUrl: null
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            $("iframe").on('load', function () {
                $("iframe")
                    .contents()
                    .find('a')
                    .click(function (e) {
                        var hostAddress = window.location.protocol + '//' + window.location.host;
                        if (e.target.href.startsWith(hostAddress)) {
                            e.preventDefault();

                            var fileName = $(this).attr('href').replace('../html/', '');
                            window.location.replace(hostAddress + '/docs/' + fileName);
                        }
                    });
            });
        });
    }

    componentWillMount() {
        const topicParts = this.props.match.params.topicParts;

        let topicUrl = "docs/view/index";
        if (topicParts != null) {
            topicUrl = "docs/view/html/" + topicParts;
        }

        this.fetchTopicInfo(topicParts, topicUrl)
    }

    fetchTopicInfo(topicParts, topicUrl) {
        fetch('docs/info/' + topicParts,
            {
                method: "GET"
            })
            .then(response => response.text())
            .then(data => {
                let documentationInfoResult = JSON.parse(data);
                let topicTitle = documentationInfoResult.title;

                this.setState({
                    topicTitle: topicTitle + " | " + defaultTitle,
                    topicUrl: topicUrl
                });
            });
    }

    render() {
        return (
            <div class="h-100 w-100">
                <Helmet>
                    <title>{this.state.topicTitle}</title>
                    <meta name="description" content="Documentation of the OpenSource .NET library TxFileSystem" />
                </Helmet>
                <iframe ref="topicFrame" class="h-100 w-100" src={this.state.topicUrl} />
            </div>
        );
    }

}

export default withRouter(Documentation);
