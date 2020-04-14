import React from 'react';
import { createPortal } from 'react-dom';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import config from './config.js';
import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient } from './hooks';

import {
  Banner,
  CurrentRefinements,
  FakeSearchBar,
  InfiniteHits,
  QueryRulesHandler,
  Refinements,
  SearchBar,
  Stats,
} from './components';

import './app.scss';

export function App(props) {
  const searchClient = useSearchClient(config.appId, config.searchApiKey);
  const lastSetStateId = React.useRef();
  const topAnchor = React.useRef();

  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(props.location)
  );
  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    Object.keys(searchState).length > 0
  );

  function onSearchStateChange(searchState) {
    clearTimeout(lastSetStateId.current);

    lastSetStateId.current = setTimeout(() => {
      props.history.push(getUrlFromState(props, searchState), searchState);

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

    topAnchor.current.scrollTo(0, 0);

    setSearchState(searchState);
  }

  React.useEffect(() => {
    if (isOverlayShowing === true) {
      document.body.classList.add('with-euip-modal-open');
    } else {
      document.body.classList.remove('with-euip-modal-open');
      setSearchState(getStateFromUrl({}));
      props.history.push('', searchState);
    }
  }, [isOverlayShowing, setSearchState]);

  return (
    <>
      <FakeSearchBar onInputClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <InstantSearch
            searchClient={searchClient}
            indexName={config.indexName || 'products'}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
            createURL={createURL}
          >
            <Configure {...config.searchParameters} />
            <QueryRulesHandler searchState={searchState} />
            {/* @TODO: see how this can be used */}
            {/* <QueryRulesBanner /> */}

            <div ref={topAnchor} id="euip-wrapper">
              <div className="euip">
                <div className="euip-leftColumn">
                  <Refinements />
                </div>

                <div className="euip-rightColumn">
                  <SearchBar onClose={() => setIsOverlayShowing(false)} />
                  <Banner />
                  <CurrentRefinements />
                  <Stats page={searchState.page} />
                  <InfiniteHits />
                </div>
              </div>
            </div>
          </InstantSearch>,
          document.body
        )}
    </>
  );
}
