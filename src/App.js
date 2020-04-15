import React from 'react';
import { createPortal } from 'react-dom';
import { InstantSearch, Configure, SortBy } from 'react-instantsearch-dom';

import config from './config';
import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient } from './hooks';

import {
  Banner,
  CurrentRefinements,
  FakeSearchBar,
  QueryRulesHandler,
  Refinements,
  SearchBox,
  Stats,
  CancelButton,
  ProductList,
} from './components';

import './theme.scss';
import './App.scss';

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

  function onSearchStateChange(nextSearchState) {
    clearTimeout(lastSetStateId.current);

    lastSetStateId.current = setTimeout(() => {
      props.history.push(
        getUrlFromState(props, nextSearchState),
        nextSearchState
      );

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${nextSearchState.query}`);
      }
    }, 400);

    setSearchState(nextSearchState);
  }

  React.useEffect(() => {
    if (isOverlayShowing === true) {
      document.body.classList.add('Unified--open');
    } else {
      document.body.classList.remove('Unified--open');
      setSearchState(getStateFromUrl({}));
      props.history.push('', searchState);
    }
  }, [isOverlayShowing, setSearchState]);

  React.useEffect(() => {
    if (topAnchor.current) {
      topAnchor.current.scrollTo(0, 0);
    }
  }, [searchState.query]);

  React.useEffect(() => {
    function onKeydown(event) {
      if (event.key === 'Escape') {
        setIsOverlayShowing(false);
      }
    }

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [setIsOverlayShowing]);

  return (
    <>
      <FakeSearchBar onClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <>
            <div className="Unified-Overlay" />

            <div className="Unified-Container">
              <InstantSearch
                searchClient={searchClient}
                indexName={config.indexName}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}
              >
                <Configure {...config.searchParameters} />
                <QueryRulesHandler searchState={searchState} />

                <div ref={topAnchor} id="Unified-Wrapper">
                  <header className="Unified-Header">
                    <SearchBox />

                    <button
                      className="Unified-CancelButton"
                      onClick={() => setIsOverlayShowing(false)}
                    >
                      <CancelButton />
                    </button>
                  </header>

                  <div className="Unified-Content">
                    <div className="Unified-LeftPanel">
                      <Refinements />
                    </div>

                    <div className="Unified-RightPanel">
                      <header className="Unified-BodyHeader">
                        <div className="Unified-BodyHeader-heading">
                          <Stats />
                          {config.sorts && config.sorts.length > 0 && (
                            <div className="Unified-BodyHeader-sortBy">
                              <span className="Unified-Label">Sort by</span>
                              <SortBy
                                items={config.sorts}
                                defaultRefinement={config.sorts[0].value}
                              />
                            </div>
                          )}
                        </div>
                        <CurrentRefinements />
                      </header>

                      <main className="Unified-BodyContent">
                        <Banner />
                        <ProductList />
                      </main>
                    </div>
                  </div>
                </div>
              </InstantSearch>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
