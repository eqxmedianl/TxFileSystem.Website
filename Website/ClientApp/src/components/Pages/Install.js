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
import VersionLink from '../Controls/VersionLink';
import PackageInstallCommands from '../Controls/PackageInstallCommands';

export class Install extends Component {
    static displayName = Install.name;

    constructor(props) {
        super(props);
        this.state = { packages: [], loading: true, latest_version: null };
        this.handleClick = this.handleClick.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
    }

    handleClick(e, version) {
        e.preventDefault();
        console.log('this is:', version);
        this.setState({ latest_version: version });
    }

    handleVersionChange(version) {
        console.log('this is:', version);
        this.setState({ latest_version: version });
    }

    componentDidMount() {
        this.populatePackages();
    }

    renderPackagesTable() {
        let latest = this.state.packages.filter((e) => e.version === this.state.latest_version)[0];
        return (
            <div>
                <Helmet>
                    <title>TxFileSystem {latest.version} Installation</title>
                    <meta name="description" content="Instructions on how to install TxFileSystem to .NET projects" />
                </Helmet>
                <section class="latest-version row mb-4">
                    <aside class="col-md-2 col-sm-12">
                        <img src={latest.iconUrl} class="float-left mr-2 w-100" />
                    </aside>
                    <div class="col-md-10 col-sm-12 mt-4 mt-md-0">
                        <header class="clearfix">
                            <h1 class="float-left">{latest.title}</h1><span class="float-left badge badge-secondary">{latest.version}</span>
                        </header>
                        <div>
                            {
                                latest.description.split("\n").map(function (item, idx) {
                                    return (
                                        <span key={idx}>
                                            {item}
                                            <br />
                                        </span>
                                    )
                                })
                            }
                        </div>
                        <div class="mt-4">
                            <PackageInstallCommands title={latest.title} version={latest.version}
                                notice="By selecting a version from the Version History the commands shown are updated." />
                        </div>
                        <div class="mt-4">
                            <h2 id="tabelLabel">Version History</h2>
                            <p>Below is a listing of TxFileSystem packages published on NuGet.org.</p>
                            <table className='table table-striped' aria-labelledby="tabelLabel">
                                <thead>
                                    <tr>
                                        <th>Version</th>
                                        <th>Downloads</th>
                                        <th>Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.packages.map(metadata =>
                                            <tr>
                                                <td><VersionLink version={metadata.version} updateVersion={this.handleVersionChange} /></td>
                                                <td>{metadata.downloadCount}</td>
                                                <td>{metadata.lastUpdated}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
          ? <p><em>Loading...</em></p>
            : this.renderPackagesTable();

        return (
          <div>
            {contents}
          </div>
        );
    }

    async populatePackages() {
        const response = await fetch('packages');
        const data = await response.json();
        this.setState({ packages: data, loading: false, latest_version: data[0].version });
    }
}
