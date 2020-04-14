import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { isMobile } from 'react-device-detect';

import config from './config.js';

import { FakeSearchBar } from './shared/FakeSearchBar';
import { Main } from './main/Main';

import { Configuration } from './shared/Configuration';
import { QueryRulesHandler } from './shared/QueryRulesHandler';
import { QueryRulesBanner } from './shared/QueryRulesBanner';
import {
  searchClient,
  createURL,
  urlToSearchState,
  searchStateToUrl,
  shouldDisplayOverlayAtLaunch,
} from './shared/Tools';

import './app.scss';

function App(props) {
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(props.location)
  );
  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    shouldDisplayOverlayAtLaunch(searchState)
  );
  const [isResultsShowing, setIsResultsShowing] = React.useState(true);

  const topAnchor = React.useRef();
  const lastSetStateId = React.useRef();

  function onSearchStateChange(searchState) {
    clearTimeout(lastSetStateId.current);

    lastSetStateId.current = setTimeout(() => {
      props.history.push(searchStateToUrl(props, searchState), searchState);

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

    if (searchState.page === 1) {
      topAnchor.current.scrollTo(0, 0);
    }

    setSearchState(searchState);
  }

  function setSearchStateSortBy(sortBy) {
    setSearchState({ ...searchState, sortBy });
  }

  React.useEffect(() => {
    if (isOverlayShowing === true) {
      document.body.classList.add('with-euip-modal-open');
    } else {
      document.body.classList.remove('with-euip-modal-open');
      setSearchState(urlToSearchState({ search: '' }));
      props.history.push('', searchState);
    }
  }, [isOverlayShowing, setSearchState]);

  return (
    <React.Fragment>
      <FakeSearchBar onInputClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing && (
        <InstantSearch
          searchClient={searchClient}
          indexName={config.indexName || 'products'}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        >
          <Configuration />
          <QueryRulesHandler searchState={searchState} />
          <QueryRulesBanner shouldDisplaySearchResults={setIsResultsShowing} />

          <div
            id="euip-wrapper"
            ref={topAnchor}
            onScroll={() => {
              // @TODO: hide QS on mobile
            }}
            className={`${isMobile ? 'mobile' : 'desktop'}`}
          >
            <div className="euip">
              {isResultsShowing && (
                <Main
                  onClose={() => setIsOverlayShowing(false)}
                  setSearchStateSortBy={setSearchStateSortBy}
                  page={searchState.page}
                />
              )}
            </div>
          </div>
        </InstantSearch>
      )}
    </React.Fragment>
  );
}

export default App;
