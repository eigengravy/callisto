import React, {Component} from 'react';

export default class Form extends Component {

    constructor(props){
        super(props)
        this.state = {
        searchTerm: ''
        }
        this.onSearchTermSubmit = this.onSearchTermSubmit.bind(this)
        this.onSearchTermUpdate = this.onSearchTermUpdate.bind(this)
    }

    onSearchTermUpdate(e) {
        this.setState({searchTerm: e.target.value})
    }

    onSearchTermSubmit(e) {
        e.preventDefault();
        this.props.searchTerm(this.state.searchTerm);
    }

    render() {
        return (
            <form className="pure-form" onSubmit={this.onSearchTermSubmit}>
                <input type="text" placeholder="Search.." className="pure-input-rounded" value={this.state.searchTerm} onChange={this.onSearchTermUpdate}/>
                <input type="submit" value="Go" className="button-xlarge pure-button pure-button-primary"/>
            </form>
        );
    }
}

