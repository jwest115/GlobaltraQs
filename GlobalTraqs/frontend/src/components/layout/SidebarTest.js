import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Sidebar from "react-sidebar";

export class SearchSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
           <Sidebar
                sidebar={<b>Sidebar content</b>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                pullRight={true}
                styles={{ sidebar: { background: "white" } }}
                >
                <button id="open-sidebar-button" onClick={() => this.onSetSidebarOpen(true)}>
                  Open sidebar
                </button>
            </Sidebar>
        );
    }
}

export default connect()(SearchSidebar);