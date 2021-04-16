/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
import React, { Component } from 'react';

import './PackageInstallCommands.css';

export default class PackageInstallCommands extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div class="pkg-install-cmds-container">
                <h2>Install the package</h2>
                <p>Below you can choose the command to install the package to your project with.</p>
                <div class="pkg-install-cmds">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a href="#packagemanager-cmd" class="nav-link active" data-toggle="tab">Package Manager</a>
                        </li>
                        <li class="nav-item">
                            <a href="#dotnet-cmd" class="nav-link" data-toggle="tab">.NET CLI</a>
                        </li>
                        <li class="nav-item">
                            <a href="#packagereference-cmd" class="nav-link" data-toggle="tab">PackageReference</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-3">
                        <div class="tab-pane fade show active" id="packagemanager-cmd">
                            <code>
                                Install-Package {this.props.title} -Version {this.props.version}
                            </code>
                        </div>
                        <div class="tab-pane fade" id="dotnet-cmd">
                            <code >
                                dotnet add package {this.props.title} --version {this.props.version}
                            </code>
                        </div>
                        <div class="tab-pane fade" id="packagereference-cmd">
                            <code >
                                &lt;PackageReference Include="{this.props.title}" Version="{this.props.version}" /&gt;
                            </code>
                        </div>
                    </div>
                    <div class="pkg-install-cmds-alert alert alert-info mt-3 small">
                        {this.props.notice}
                    </div>
                </div>
            </div>
        );
    }
}