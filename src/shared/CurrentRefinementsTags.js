import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import config from './../config.js'

const CurrentRefinementsTags = ({ items, refine }) => {
    //This reduce loop over the items
    //If the items key present then it's a currentRefinement type else it's a range
    const tags = items.reduce((acc, curr) => (
        [...acc, ...("items" in curr ?
            [...curr.items.map(refinement => ({
                group: config.translations.refinementList[curr.attribute] || curr.attribute,
                label: refinement.label.split(';')[0],
                value: refinement.value
            }))]
            :
            [{
                group: config.translations.refinementList[curr.attribute] || curr.attribute,
                label: `${curr.currentRefinement.min || "min"} – ${curr.currentRefinement.max || "max"}`,
                value: curr.value
            }]
        )]
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