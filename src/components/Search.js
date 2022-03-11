import React from 'preact/compat';
import { InstantSearch, Configure, SortBy } from 'react-instantsearch-dom';

import { useAppContext, useSearchContext } from '../hooks';

import { Banner } from './Banner';
import { CloseIcon } from './CloseIcon';
import { CurrentRefinements } from './CurrentRefinements';
import { FiltersButton } from './FiltersButton';
import { NoResultsHandler } from './NoResultsHandler';
import { ProductList } from './ProductList';
import { QueryRulesHandler } from './QueryRulesHandler';
import { Refinements } from './Refinements';
import { ResetButton } from './ResetButton';
import { HeaderSearchBox } from './SearchBox';
import { SeeResultsButton } from './SeeResultsButton';
import { Stats } from './Stats';
import { Views } from './Views';

export const Search = (props) => {
  const { config, view, searchParameters, isMobile } = useAppContext();
  const { isSearchStalled } = useSearchContext();

  const filtersAnchor = React.useRef();

  const defaultSort = [
    {
      label: 'Featured',
      value: config.index.indexName,
    },
  ];
  const sorts = defaultSort.concat(config.sorts);

  const hasRefinements = Boolean(config.refinements.length);

  React.useEffect(() => {
    if (filtersAnchor.current && props.isFiltering) {
      filtersAnchor.current.scrollTop = 0;
    }
  }, [props.isFiltering]);

  return (
    <InstantSearch
      searchClient={props.searchClient}
      indexName={props.indexName}
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}
    >
      <Configure {...searchParameters} />
      <QueryRulesHandler searchState={props.searchState} />

      <div id="uni-Wrapper">
        <header className="uni-Header">
          <div className="uni-Header-inner">
            <HeaderSearchBox />

            <button
              type="button"
              className="uni-CloseButton"
              title="Press Esc to close"
              onClick={props.onClose}
            >
              <CloseIcon />
            </button>

            {isSearchStalled && <div className="uni-LoadingProgress" />}
          </div>
        </header>

        <div className="uni-Content">
          {hasRefinements && (
            <>
              <div
                data-layout="mobile"
                className="uni-LeftPanel-Overlay"
                aria-hidden="true"
                onClick={() => props.setIsFiltering(false)}
              />
              <div className="uni-LeftPanel">
                <div className="uni-Refinements">
                  <div
                    className="uni-Refinements-scrollable"
                    ref={filtersAnchor}
                  >
                    <header
                      className="uni-Refinements-heading"
                      data-layout="mobile"
                    >
                      <span>Filters</span>
                      <button
                        type="button"
                        className="uni-Refinements-closeButton"
                        title="Close filters"
                        onClick={() => {
                          props.setIsFiltering(false);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </header>
                    {isMobile && <CurrentRefinements />}
                    <Refinements />
                  </div>
                  <footer
                    className="uni-Refinements-footer"
                    data-layout="mobile"
                  >
                    <ResetButton
                      onClick={() => {
                        props.setIsFiltering(false);
                      }}
                    />
                    <SeeResultsButton
                      onClick={() => {
                        props.setIsFiltering(false);
                      }}
                    />
                  </footer>
                </div>
              </div>
            </>
          )}

          <div className="uni-RightPanel">
            <header className="uni-BodyHeader">
              <div className="uni-BodyHeader-heading">
                <div className="uni-BodyHeader-stats">
                  <Stats />
                </div>

                <div className="uni-BodyHeader-extraOptions">
                  {sorts.length > 1 && (
                    <div className="uni-BodyHeader-sortBy">
                      <span className="uni-Label">Sort by</span>
                      <SortBy
                        items={sorts}
                        defaultRefinement={sorts[0].value}
                      />
                    </div>
                  )}

                  <div>
                    <Views view={view} setView={props.setView} />
                  </div>
                </div>
              </div>
              {!isMobile && <CurrentRefinements />}
            </header>

            <main className="uni-BodyContent">
              <Banner />
              <NoResultsHandler>
                <ProductList />
              </NoResultsHandler>
            </main>
          </div>
          {hasRefinements && (
            <FiltersButton
              onClick={() => {
                props.setIsFiltering(true);
              }}
            />
          )}
        </div>
      </div>
    </InstantSearch>
  );
};
