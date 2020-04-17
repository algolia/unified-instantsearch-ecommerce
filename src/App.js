import React from 'react';
import { createPortal } from 'react-dom';
import {
  InstantSearch,
  Configure,
  SortBy,
  ScrollTo,
  connectHitInsights,
} from 'react-instantsearch-dom';

import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient, useInsightsClient } from './hooks';
import {
  Banner,
  CurrentRefinements,
  FakeSearchBar,
  QueryRulesHandler,
  Refinements,
  HeaderSearchBox,
  Stats,
  Hit,
  CancelButton,
  ProductList,
} from './components';

export function App({ config, location, history }) {
  const searchClient = useSearchClient(config.appId, config.searchApiKey);
  const insightsClient = useInsightsClient(config.appId, config.searchApiKey);
  const hitComponent = React.useMemo(
    () => connectHitInsights(insightsClient)(Hit),
    [insightsClient]
  );

  const lastSetStateId = React.useRef();
  const topAnchor = React.useRef();

  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(location)
  );
  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    Object.keys(searchState).length > 0
  );

  function onSearchStateChange(nextSearchState) {
    clearTimeout(lastSetStateId.current);

    lastSetStateId.current = setTimeout(() => {
      history.push(
        getUrlFromState({ location }, nextSearchState),
        nextSearchState
      );

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${nextSearchState.query}`);
      }
    }, 400);

    setSearchState(nextSearchState);
  }

  React.useEffect(() => {
    const nextSearchState = getStateFromUrl(location);

    if (searchState !== nextSearchState) {
      setSearchState(nextSearchState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setSearchState]);

  React.useEffect(() => {
    if (isOverlayShowing === true) {
      document.body.classList.add('Unified--open');
    } else {
      document.body.classList.remove('Unified--open');
      setSearchState(getStateFromUrl(location));
      history.push('', searchState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverlayShowing]);

  React.useEffect(() => {
    if (topAnchor.current) {
      topAnchor.current.scrollTo(0, 0);
    }
  }, [searchState.query]);

  React.useEffect(() => {
    function onKeydown(event) {
      if (event.key === 'Escape') {
        if (
          document.activeElement.isContentEditable ||
          document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'SELECT' ||
          document.activeElement.tagName === 'TEXTAREA'
        ) {
          return;
        }

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
            <div
              className="Unified-Overlay"
              onClick={() => setIsOverlayShowing(false)}
            />

            <div className="Unified-Container" ref={topAnchor}>
              <InstantSearch
                searchClient={searchClient}
                indexName={config.index.indexName}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}
              >
                <Configure {...config.index.searchParameters} />
                <QueryRulesHandler searchState={searchState} />

                <div id="Unified-Wrapper">
                  <header className="Unified-Header">
                    <HeaderSearchBox />

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
                      <ScrollTo>
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
                          <ProductList hitComponent={hitComponent} />
                        </main>
                      </ScrollTo>
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
