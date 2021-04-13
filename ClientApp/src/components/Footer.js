import React, { Component } from 'react';

export class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <footer class="footer border-top w-100 p-2">
                <div class="container text-center">
                    <span class="text-muted">&copy; 2021 <a href="https://www.eqx-media.nl/">EQX Media B.V.</a> All rights reserved.</span>
                </div>
            </footer>
        );
    }
}