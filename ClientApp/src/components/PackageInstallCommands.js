import React, { Component } from 'react';

export default class PackageInstallCommands extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div class="pkg-install-cmds">
                <h2>Install the package</h2>
                <p>Below you can choose the command to install the package to your project with.</p>
                <div class="bs-example">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a href="#home" class="nav-link active" data-toggle="tab">Package Manager</a>
                        </li>
                        <li class="nav-item">
                            <a href="#profile" class="nav-link" data-toggle="tab">.NET CLI</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="home">
                            <code>
                                Install-Package {this.props.title} -Version {this.props.version}
                            </code>
                        </div>
                        <div class="tab-pane fade" id="profile">
                            <code>
                                dotnet add package {this.props.title} --version {this.props.version}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}