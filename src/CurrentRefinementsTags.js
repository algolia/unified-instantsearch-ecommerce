import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

class CurrentRefinementsTags extends React.Component {

    render() {
        const { items, refine, createURL } = this.props;

        const tags = items.reduce((acc, curr) => (
            [...acc, ...curr.items.map(refinement => ({
                group: curr.attribute,
                label: refinement.label,
                value: refinement.value
            }))]
        ), []);

        return (
            <ul className="euip-RefinementsTags">
                {tags.map((tag, idx) => {
                    return (
                        <li key={idx}
                            onClick={e => { e.preventDefault(); refine(tag.value); }}>
                            {tag.label}
                        </li>
                    )
                })}
            </ul>
        )
    }

}

export default connectCurrentRefinements(CurrentRefinementsTags);