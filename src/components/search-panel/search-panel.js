import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term : ''
    }

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };

    onSearch = (e) => {
        e.preventDefault();
        this.probs.onSearchItem(this.state.label);
        ;
    }

    render(){
    return (<input 
                className='search-input'
                placeholder='search' 
                onChange={this.onSearchChange}
                value={this.state.term}
                />
    );};
};

