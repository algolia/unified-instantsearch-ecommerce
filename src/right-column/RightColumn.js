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
                <p className="ais-Hits-category">{config.HITS.categoryAttribute ? hit[config.HITS.categoryAttribute] : hit.category}</p>
                <p className="ais-Hits-title">{config.HITS.titleAttribute ? hit[config.HITS.titleAttribute] : hit.title}</p>
                <p className="ais-Hits-description">{config.HITS.descriptionAttribute ? hit[config.HITS.descriptionAttribute] : hit.description}</p>
                <p className="ais-Hits-price">{`${config.HITS.priceAttribute ? hit[config.HITS.priceAttribute] : hit.price} ${config.HITS.currency}`}</p>
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