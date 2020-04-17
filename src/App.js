import React from 'react';
import { createPortal } from 'react-dom';
import { connectHitInsights } from 'react-instantsearch-dom';

import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient, useInsightsClient } from './hooks';
import { SearchButton, Search, Hit } from './components';

export const AppContext = React.createContext(null);

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

  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    Object.keys(searchState).length > 0
  );

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
      console.log(event);
      const element = event.target || event.srcElement;

      if (
        element.isContentEditable ||
        element.tagName === 'INPUT' ||
        element.tagName === 'SELECT' ||
        element.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (isOverlayShowing) {
        if (event.key === 'Escape') {
          event.stopPropagation();
          event.preventDefault();
          setIsOverlayShowing(false);
        }
      } else if (!isOverlayShowing) {
        if (
          config.keyboardShortcuts &&
          config.keyboardShortcuts.indexOf(event.key) !== -1
        ) {
          event.stopPropagation();
          event.preventDefault();
          setIsOverlayShowing(true);
        }
      }
    }

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [isOverlayShowing, setIsOverlayShowing, config.keyboardShortcuts]);

  return (
    <AppContext.Provider value={{ config }}>
      <SearchButton onClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <>
            <div
              className="Unified-Overlay"
              onClick={() => setIsOverlayShowing(false)}
            />

            <div className="Unified-Container" ref={topAnchor}>
              <Search
                searchClient={searchClient}
                indexName={config.index.indexName}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}
                hitComponent={hitComponent}
                onClose={() => setIsOverlayShowing(false)}
              />
            </div>
          </>,
          document.body
        )}
    </AppContext.Provider>
  );
}
