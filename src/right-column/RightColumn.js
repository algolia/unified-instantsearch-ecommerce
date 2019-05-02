import React from 'react';
import { Hits } from 'react-instantsearch-dom';

import CurrentRefinementsTags from './CurrentRefinementsTags';

const Hit = ({ hit }) => (
    <React.Fragment>
        <picture className="ais-Hits-image">
            <img src="https://placebear.com/600/800" alt={hit.title} />
        </picture>
        <section className="ais-Hits-content">
            <p className="ais-Hits-category">{hit.category || 'Category'}</p>
            <p className="ais-Hits-title">{hit.title}</p>
            <p className="ais-Hits-description">{hit.description}</p>
            <p className="ais-Hits-price">{hit.price || 'Gratuit'}</p>
        </section>
    </React.Fragment>
);

class RightColumn extends React.Component {

    render() {
        return (
            <div className="euip-rightColumn">
                <CurrentRefinementsTags />
                <Hits hitComponent={Hit} />
            </div>
        )
    }

}

export default RightColumn;