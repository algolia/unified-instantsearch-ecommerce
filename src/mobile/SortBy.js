import React from 'react';
import { connectSortBy  } from 'react-instantsearch-dom';

class SortBy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSort: props.items[0].value
        }
    }

    onInputChanged = value => {
        const { setSearchStateSortBy, refine } = this.props;

        refine(value);
        setSearchStateSortBy(value);
        this.setState({ selectedSort: value });
    };

    render() {
        const { items } = this.props;
        const { selectedSort } = this.state;

        return (
            <React.Fragment>
                {items.map((item, idx) => (
                    <div key={idx}>
                        <input type="radio"
                               name="euip-sort"
                               id={`euip-sort-${item.value}`}
                               value={item.value}
                               checked={selectedSort === item.value}
                               onChange={() => this.onInputChanged(item.value)} />
                        <label htmlFor={`euip-sort-${item.value}`}>{item.label}</label>
                    </div>

                ))}
            </React.Fragment>
        )
    }
}

export default connectSortBy(SortBy);