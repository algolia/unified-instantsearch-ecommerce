import React from 'react';
import { createPortal } from 'react-dom';
import { connectHitInsights } from 'react-instantsearch-dom';

import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient, useInsights } from './hooks';
import { SearchButton, Search, Hit } from './components';

export const AppContext = React.createContext(null);

export function App({ config, location, history }) {
  const searchClient = useSearchClient(config.appId, config.searchApiKey);
  const { aa, userToken } = useInsights(
    config.appId,
    config.searchApiKey,
    config.setUserToken
  );
  const hitComponent = React.useMemo(() => connectHitInsights(aa)(Hit), [aa]);
  const lastSetStateId = React.useRef();
  const topAnchor = React.useRef();
  const [view, setView] = React.useState('grid');
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
      document.body.classList.add('uni--open');
    } else {
      document.body.classList.remove('uni--open');
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
    <AppContext.Provider value={{ config, view, userToken }}>
      <SearchButton onClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <>
            <div
              className="uni-Overlay"
              onClick={() => setIsOverlayShowing(false)}
            />

            <div className="uni-Container" ref={topAnchor}>
              <Search
                searchClient={searchClient}
                indexName={config.index.indexName}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}
                hitComponent={hitComponent}
                onClose={() => setIsOverlayShowing(false)}
                setView={setView}
              />
            </div>
          </>,
          document.body
        )}
    </AppContext.Provider>
  );
}
