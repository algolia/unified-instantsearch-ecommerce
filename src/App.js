import React from 'react';
import { createPortal } from 'react-dom';
import { connectHitInsights } from 'react-instantsearch-dom';

import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient, useInsights } from './hooks';
import { SearchButton, Search } from './components';

export const AppContext = React.createContext(null);
export const SearchContext = React.createContext(null);

export function App({ config, location, history }) {
  const searchClient = useSearchClient(config);
  const { aa, userToken } = useInsights(
    config.appId,
    config.searchApiKey,
    config.setUserToken
  );
  const lastSetStateId = React.useRef();
  const topAnchor = React.useRef();
  const [view, setView] = React.useState('grid');
  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(location)
  );
  const searchContextRef = React.useRef({});
  const searchParameters = {
    userToken,
    enablePersonalization: Boolean(userToken),
    ...config.index.searchParameters,
  };
  const ConnectedHit = React.useMemo(
    () =>
      connectHitInsights(aa)((props) => (
        <config.hitComponent {...props} view={view} />
      )),
    [aa, view]
  );

  function setSearchContext(context) {
    searchContextRef.current = {
      ...searchContextRef.current,
      ...context,
    };
  }

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

  const [isFiltering, setIsFiltering] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        config,
        view,
        userToken,
        searchState,
        searchParameters,
        setSearchContext,
        ConnectedHit,
      }}
    >
      <SearchButton onClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <>
            <div
              className="uni-Overlay"
              onClick={() => setIsOverlayShowing(false)}
            />

            <div
              className={[
                'uni-Container',
                isFiltering === true && 'uni-Container--filtering',
              ]
                .filter(Boolean)
                .join(' ')}
              ref={topAnchor}
            >
              <SearchContext.Provider value={searchContextRef.current}>
                <Search
                  searchClient={searchClient}
                  indexName={config.index.indexName}
                  searchState={searchState}
                  onSearchStateChange={onSearchStateChange}
                  createURL={createURL}
                  onClose={() => setIsOverlayShowing(false)}
                  setView={setView}
                  isFiltering={isFiltering}
                  setIsFiltering={setIsFiltering}
                />
              </SearchContext.Provider>
            </div>
          </>,
          document.body
        )}
    </AppContext.Provider>
  );
}
