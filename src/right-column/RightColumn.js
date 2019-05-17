import React from 'react';
import { connectHits, connectStateResults, Pagination, ScrollTo } from 'react-instantsearch-dom';

import CurrentRefinementsTags from './CurrentRefinementsTags';
import { trackClickOnHit } from './../shared/Analytics'

const Hit = ({ hit, idx, searchResults }) => {
    return (
        <div className="ais-Hits-item"
            onClick={() =>  trackClickOnHit(
                searchResults.index,
                'Click on product',
                searchResults.queryID,
                hit.objectID,
                searchResults.hitsPerPage * searchResults.page + idx + 1
            )}>
            <picture className="ais-Hits-image">
                <img src="https://placekitten.com/600/800" alt={hit.title} />
            </picture>
            <section className="ais-Hits-content">
                <p className="ais-Hits-category">{hit.category || 'Category'}</p>
                <p className="ais-Hits-title">{hit.title}</p>
                <p className="ais-Hits-description">{hit.description}</p>
                <p className="ais-Hits-price">{hit.price || 'Gratuit'}</p>
            </section>
        </div>
    )
};

const Hits = connectHits(
    connectStateResults(({ hits, searchResults }) => (
        <ScrollTo scrollOn="page">
            <div className="ais-Hits-list">
                {hits.map((hit, idx) => <Hit key={idx} hit={hit} idx={idx} searchResults={searchResults} />)}
            </div>
        </ScrollTo>
    ))
);

const RightColumn = () => (
    <div className="euip-rightColumn">
        <CurrentRefinementsTags />
        <Hits />
        <Pagination />
    </div>
);

export default RightColumn;