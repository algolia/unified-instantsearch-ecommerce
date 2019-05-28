import React, { Component } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom';

import config from '../config.js'
import { trackClickOnHit } from './../shared/Analytics'

class InfiniteHits extends Component {
    constructor(props) {
        super(props);
        //Page start at 1, we use 0 based index
        this.state = { basePage: props.page - 1 };

        this.lastSentinel = null
        this.lastObserver = null
        this.sentinels = []
        this.observers = []
    }

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
        this.observers.forEach(observer => observer.disconnect());
        this.lastObserver.disconnect();
    }

    onPageSentinelIntersection(entries, page) {
        entries.forEach(entry => {
            //Skip intersection when new page is loading
            if (this.state.newPage)
                return this.setState({ newPage: false })
            if (!entry.isIntersecting) {
                //Substracting one page when sentinel is scrolled down out of the screen
                if (entry.boundingClientRect.y > entry.rootBounds.height / 2)
                    this.props.setSearchStatePage(this.state.basePage + page)
            } else {
                //Add one page when sentinel is showing from bottom of the screen
                if (entry.boundingClientRect.y > entry.rootBounds.height / 2)
                    this.props.setSearchStatePage(this.state.basePage + page + 1)
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
            acc.push(new IntersectionObserver((entries) => this.onPageSentinelIntersection(entries, (i + 1))));
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
                <button
                    className="ais-InfiniteHits-previous" style={{ display: hasPrevious ? "block" : "none" }}
                    //Substract page to base
                    onClick={() => this.setState({ newPage: true, basePage: this.state.basePage - 1 }, refinePrevious)}>
                    Show previous
                </button>
                <ul className="ais-InfiniteHits-list">
                    {hits.map((hit, i) => {
                        if ((i + 1) % config.instantSearchConfigure.hitsPerPage === 0 && (i + 1) !== hits.length)
                            return (
                                <React.Fragment key={i}>
                                    <config.hits.render hit={hit} trackClickOnHit={trackClickOnHit} />
                                    <li
                                        className="ais-InfiniteHits-sentinel"
                                        ref={c => (this.sentinels.push(c))}
                                    />
                                </React.Fragment>
                            );
                        else
                            return <config.hits.render key={i} hit={hit} trackClickOnHit={trackClickOnHit} />
                    })}
                    <li
                        className="ais-InfiniteHits-sentinel"
                        ref={c => (this.lastSentinel = c)}
                    />
                </ul>
            </div >
        );
    }
}

export default connectInfiniteHits(InfiniteHits);