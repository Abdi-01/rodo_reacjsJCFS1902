import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
                <a class="navbar-brand" href="#">To Do App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <div style={{ width: "fit-content", marginLeft: "auto" }}>
                        <a class="navbar-brand text-muted" href="#">Hello, {this.props.nama} {this.props.data}</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;