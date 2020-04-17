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
import { CancelButton } from './CancelButton';
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

      <div id="Unified-Wrapper">
        <header className="Unified-Header">
          <HeaderSearchBox />

          <button
            className="Unified-CancelButton"
            title="Press Esc to close"
            onClick={props.onClose}
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
                <ProductList hitComponent={props.hitComponent} />
              </main>
            </ScrollTo>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}
