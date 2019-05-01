import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const CurrentRefinementsTags = ({ items, refine }) => {
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
                        onClick={e => { e.preventDefault(); refine(tag.value); }}
                        className="euip-RefinementsTags-tag"
                    >
                        {tag.group}: <em>{tag.label}</em>
                    </li>
                )
            })}
        </ul>
    )
};

export default connectCurrentRefinements(CurrentRefinementsTags);