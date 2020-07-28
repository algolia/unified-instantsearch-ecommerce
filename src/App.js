import React, { createPortal } from 'preact/compat';
import { connectHitInsights } from 'react-instantsearch-dom';
import { useHistory, useLocation } from 'react-router-dom';

import { getUrlFromState, getStateFromUrl, createURL } from './router';
import { useSearchClient, useInsights, useMatchMedia } from './hooks';
import { SearchButton, Search } from './components';

export const AppContext = React.createContext(null);
export const SearchContext = React.createContext(null);

export function App({ config }) {
  const history = useHistory();
  const location = useLocation();
  const searchClient = useSearchClient(config);
  const { aa, userToken } = useInsights(
    config.appId,
    config.searchApiKey,
    config.setUserToken
  );
  const { isMobile } = useMatchMedia(config);
  const lastSetStateId = React.useRef();
  const topAnchor = React.useRef();
  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(location)
  );
  const [isOverlayShowing, setIsOverlayShowing] = React.useState(
    Object.keys(searchState).length > 0
  );
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [view, setView] = React.useState('grid');
  const [searchContext, setInternalSearchContext] = React.useState({
    isSearchStalled: false,
  });
  const searchParameters = {
    userToken,
    enablePersonalization: Boolean(userToken),
    snippetEllipsisText: '…',
    ...config.index.searchParameters,
  };
  const ConnectedHit = React.useMemo(
    () =>
      connectHitInsights(aa)((props) => (
        <config.hitComponent {...props} view={view} />
      )),
    [aa, view]
  );

  const setSearchContext = React.useCallback(function setSearchContext(
    context
  ) {
    setInternalSearchContext((prevSearchContext) => ({
      ...prevSearchContext,
      ...context,
    }));
  },
  []);

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

  // Handle the browser pop state event to open the search overlay if the
  // next URL maps to a search state.
  React.useEffect(() => {
    function onPopState() {
      if (isOverlayShowing === true) {
        return;
      }

      const nextSearchState = getStateFromUrl(window.document.location);

      if (Object.keys(nextSearchState).length > 0) {
        setIsOverlayShowing(true);
      }
    }

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [isOverlayShowing, setIsOverlayShowing]);

  // Update the search state when the location changes with the router.
  React.useEffect(() => {
    const nextSearchState = getStateFromUrl(location);

    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setSearchState]);

  React.useEffect(() => {
    if (isOverlayShowing === true) {
      document.body.classList.add('uni-App--open');
    } else {
      document.body.classList.remove('uni-App--open');
      const nextSearchState = getStateFromUrl({});
      setSearchState(nextSearchState);

      if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
        history.push('', nextSearchState);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverlayShowing, setSearchState, history]);

  React.useEffect(() => {
    if (topAnchor.current) {
      topAnchor.current.scrollTop = 0;
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
        if (event.keyCode === 27) {
          event.stopPropagation();
          event.preventDefault();

          if (isFiltering) {
            setIsFiltering(false);
          } else {
            setIsOverlayShowing(false);
          }
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
  }, [
    isOverlayShowing,
    isFiltering,
    setIsOverlayShowing,
    config.keyboardShortcuts,
  ]);

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
        isMobile,
        topAnchor,
      }}
    >
      <SearchButton onClick={() => setIsOverlayShowing(true)} />

      {isOverlayShowing &&
        createPortal(
          <>
            <div
              style={{ zIndex: config.styles.baseZIndex }}
              className="uni-Overlay"
              onClick={() => setIsOverlayShowing(false)}
            />

            <div
              style={{ zIndex: config.styles.baseZIndex }}
              className={[
                'uni-Container',
                isFiltering === true && 'uni-Container--filtering',
              ]
                .filter(Boolean)
                .join(' ')}
              ref={topAnchor}
            >
              <SearchContext.Provider value={searchContext}>
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
