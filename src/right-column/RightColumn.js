import React from 'react';
import { connectHits, connectStateResults, Pagination, ScrollTo } from 'react-instantsearch-dom';
import config from '../config.json'

import CurrentRefinementsTags from './CurrentRefinementsTags';
import { trackClickOnHit } from './../shared/Analytics'

const Hit = ({ hit, idx, searchResults }) => {
    return (
        <div className="ais-Hits-item"
            onClick={() => trackClickOnHit(
                searchResults.index,
                'Click on product',
                searchResults.queryID,
                hit.objectID,
                searchResults.hitsPerPage * searchResults.page + idx + 1
            )}>
            <picture className="ais-Hits-image">
                <img src={hit[config.HITS.imageAttribute]} alt={hit[config.HITS.titleAttribute]} />
            </picture>
            <section className="ais-Hits-content">
                <p className="ais-Hits-category">{hit[config.HITS.categoryAttribute] || 'Category'}</p>
                <p className="ais-Hits-title">{hit[config.HITS.titleAttribute]}</p>
                <p className="ais-Hits-description">{hit[config.HITS.descriptionAttribute]}</p>
                <p className="ais-Hits-price">{hit[config.HITS.priceAttribute] ? `${hit[config.HITS.priceAttribute]} ${config.HITS.currency}` : 'Gratuit'}</p>
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