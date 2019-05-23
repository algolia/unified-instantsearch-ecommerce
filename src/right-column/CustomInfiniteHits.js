import React, { Component } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom';

import config from '../config.js'
import { trackClickOnHit } from './../shared/Analytics'

class InfiniteHits extends Component {
    sentinel = null

    onSentinelIntersection = entries => {
        const { hasMore, refine } = this.props;
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMore) {
                refine();
            }
        });
    };

    componentDidMount() {
        this.observer = new IntersectionObserver(this.onSentinelIntersection);
        this.observer.observe(this.sentinel);
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    render() {
        const {
            hits,
            hasPrevious,
            refinePrevious,
        } = this.props;

        return (
            <div className="ais-InfiniteHits">
                <button disabled={!hasPrevious} onClick={refinePrevious}>
                    Show previous
                </button>
                <ul className="ais-InfiniteHits-list">
                    {hits.map((hit, i) => (
                        <config.HITS.render key={i} hit={hit} trackClickOnHit={trackClickOnHit} />
                    ))}
                    <li
                        className="ais-InfiniteHits-sentinel"
                        ref={c => this.sentinel = c}
                    />
                </ul>
            </div>
        );
    }
}

export default connectInfiniteHits(InfiniteHits);