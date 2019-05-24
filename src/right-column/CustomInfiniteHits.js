import React, { Component } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom';

import config from '../config.js'
import { trackClickOnHit } from './../shared/Analytics'

class InfiniteHits extends Component {
    lastSentinel = null
    lastObserver = null
    sentinels = []
    observers = []

    onSentinelIntersection = entries => {
        const { hasMore, refine } = this.props;
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMore) {
                this.setState({ newPage: true })
                refine();
            }
        });
    };

    componentDidMount() {
        this.lastObserver = new IntersectionObserver(this.onSentinelIntersection);
        this.lastObserver.observe(this.lastSentinel);
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    onPageSentinelIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (this.state.newPage)
                    return this.setState({ newPage: false })
                if (entry.boundingClientRect.y < entry.rootBounds.height / 2)
                    this.props.changeSearchStatePage(-1)
                else
                    this.props.changeSearchStatePage(1)
            }
        });
    }

    componentDidUpdate() {
        this.sentinels = this.sentinels.filter((sentinel) => sentinel)

        this.observers = this.sentinels.reduce((acc, sentinel, i) => {
            if (this.observers.length > i) {
                acc.push(this.observers[i]);
                return acc;
            }
            acc.push(new IntersectionObserver((entries) => this.onPageSentinelIntersection(entries)));
            acc[i].observe(sentinel);
            return acc;
        }, [])
    }

    render() {
        const {
            hits,
            hasPrevious,
            refinePrevious,
        } = this.props;

        //Reset sentinel list
        this.sentinels = []

        return (
            <div className="ais-InfiniteHits">
                <button className="ais-InfiniteHits-previous" style={{ display: hasPrevious ? "block" : "none" }} onClick={refinePrevious}>
                    Show previous
                </button>
                <ul className="ais-InfiniteHits-list">
                    {hits.map((hit, i) => {
                        if ((i + 1) % config.HITS.hitsPerPage === 0 && (i + 1) !== hits.length)
                            return <React.Fragment key={i}>
                                <config.HITS.render hit={hit} trackClickOnHit={trackClickOnHit} />
                                <li
                                    className="ais-InfiniteHits-sentinel"
                                    ref={c => (this.sentinels.push(c))}
                                />
                            </React.Fragment>
                        else
                            return <config.HITS.render key={i} hit={hit} trackClickOnHit={trackClickOnHit} />
                    })}
                    <li
                        className="ais-InfiniteHits-sentinel"
                        ref={c => (this.lastSentinel = c)}
                    />
                </ul>
            </div>
        );
    }
}

export default connectInfiniteHits(InfiniteHits);