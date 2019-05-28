import React from 'react';
import { connectSortBy  } from 'react-instantsearch-dom';

import config from "../config";

class SortBy extends React.Component {
    onSelectChanged = value => {
        const { setSearchStateSortBy, refine } = this.props;

        refine(value);
        setSearchStateSortBy(value);
    };

    render() {
        const { items } = this.props;

        return (
            <select onChange={e => this.onSelectChanged(e.target.value)}>
                {items.map((item, idx) => (
                    <option value={item.value} key={idx}>{item.label}</option>
                ))}
            </select>
        )
    }
}

export default connectSortBy(SortBy);