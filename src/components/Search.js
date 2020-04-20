import React from 'react';
import {
  InstantSearch,
  Configure,
  SortBy,
  ScrollTo,
} from 'react-instantsearch-dom';

import { useAppContext } from '../hooks';
import { Banner } from './Banner';
import { CurrentRefinements } from './CurrentRefinements';
import { QueryRulesHandler } from './QueryRulesHandler';
import { Refinements } from './Refinements';
import { HeaderSearchBox } from './SearchBox';
import { Stats } from './Stats';
import { CloseIcon } from './CloseIcon';
import { ProductList } from './ProductList';

export function Search(props) {
  const { config } = useAppContext();

  return (
    <InstantSearch
      searchClient={props.searchClient}
      indexName={props.indexName}
      searchState={props.searchState}
      onSearchStateChange={props.onSearchStateChange}
      createURL={props.createURL}
    >
      <Configure {...config.index.searchParameters} />
      <QueryRulesHandler searchState={props.searchState} />

      <div id="uni-Wrapper">
        <header className="uni-Header">
          <HeaderSearchBox />

          <button
            className="uni-CloseButton"
            title="Press Esc to close"
            onClick={props.onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="uni-Content">
          <div className="uni-LeftPanel">
            <Refinements />
          </div>

          <div className="uni-RightPanel">
            <ScrollTo>
              <header className="uni-BodyHeader">
                <div className="uni-BodyHeader-heading">
                  <div className="uni-BodyHeader-stats">
                    <Stats />
                  </div>

                  {config.sorts && config.sorts.length > 0 && (
                    <div className="uni-BodyHeader-sortBy">
                      <span className="uni-Label">Sort by</span>
                      <SortBy
                        items={config.sorts}
                        defaultRefinement={config.sorts[0].value}
                      />
                    </div>
                  )}
                </div>
                <CurrentRefinements />
              </header>

              <main className="uni-BodyContent">
                <Banner />
                <ProductList hitComponent={props.hitComponent} />
              </main>
            </ScrollTo>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}
