import React from 'react';
import { isMobile } from 'react-device-detect';
import { InstantSearch, ScrollTo } from 'react-instantsearch-dom';

import config from './config.js';

import { FakeSearchBar } from './shared/FakeSearchBar';
import { Main } from './main/Main';

import { useSearchClient } from './hooks/useSearchClient.js';

import { Configuration } from './shared/Configuration';
import { QueryRulesHandler } from './shared/QueryRulesHandler';
import { QueryRulesBanner } from './shared/QueryRulesBanner';
import { getUrlFromState, getStateFromUrl, createURL } from './router';

import './app.scss';

export function App(props) {
  const searchClient = useSearchClient(config.appId, config.searchApiKey);
  const lastSetStateId = React.useRef();

  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(props.location)
  );
  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    Object.keys(searchState).length > 0
  );
  const [isResultsShowing, setIsResultsShowing] = React.useState(true);

  function onSearchStateChange(searchState) {
    clearTimeout(lastSetStateId.current);

    lastSetStateId.current = setTimeout(() => {
      props.history.push(getUrlFromState(props, searchState), searchState);

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

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
            className={`${isMobile ? 'mobile' : 'desktop'}`}
          >
            <ScrollTo>
              <div className="euip">
                {isResultsShowing && (
                  <Main
                    onClose={() => setIsOverlayShowing(false)}
                    setSearchStateSortBy={() => {}}
                    page={searchState.page}
                  />
                )}
              </div>
            </ScrollTo>
          </div>
        </InstantSearch>
      )}
    </React.Fragment>
  );
}
