import React from 'react';
import {
  Index,
  Configure,
  connectCurrentRefinements,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';

import { useAppContext, useSearchContext } from '../hooks';
import {
  NO_RESULTS_INDEX_NAME,
  QUERY_SUGGESTIONS_INDEX_NAME,
} from '../constants';

export const NoResultsHandler = connectStateResults(function ResultsWrapper(
  props
) {
  if (props.searchState.query && props.searchResults?.nbHits === 0) {
    return (
      <NoResults
        query={props.searchState.query}
        isSearching={props.searching}
      />
    );
  }

  return props.children;
});

const NoResults = React.memo(
  function NoResults(props) {
    return (
      <div className="uni-NoResults">
        <h2 className="uni-NoResults-Title">
          No results for “<em>{props.query}</em>“.
        </h2>

        <ResultsInAllCategories>
          <QuerySuggestions />
        </ResultsInAllCategories>
      </div>
    );
  },
  function areEqual(_prevProps, nextProps) {
    // Not re-rendering when it's searching allows to avoid inconsistent UIs
    // where you click on a Query Suggestion, the "no results" title updates
    // with the clicked query showing that there's no result whereas it's only
    // loading waiting for new results.
    return nextProps.isSearching === true;
  }
);

const ResultsInAllCategories = connectCurrentRefinements(function ClearFilters(
  props
) {
  const { searchState, searchParameters } = useAppContext();

  if (props.items.length === 0) {
    return props.children;
  }

  return (
    <>
      <p>
        Check the spelling, try a more general term, or{' '}
        <button
          className="uni-NoResults-ClearButton"
          onClick={(event) => {
            event.preventDefault();
            props.refine(props.items);
          }}
        >
          remove filters
        </button>
        .
      </p>

      <Index indexName={NO_RESULTS_INDEX_NAME}>
        <Configure
          {...searchParameters}
          query={searchState.query}
          hitsPerPage={4}
        />
        <HitsPreview
          onSeeAllClick={(event) => {
            event.preventDefault();
            props.refine(props.items);
          }}
        />
      </Index>
    </>
  );
});

const HitsPreview = connectHits(function MoreHits(props) {
  const { view, searchState, ConnectedHit } = useAppContext();

  if (props.hits.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="uni-NoResults-ResultSuggestionTitle">
        Results for “<em>{searchState.query}</em>“ in all categories:
      </p>

      <div className="ais-Hits">
        <ol
          className={[
            'ais-Hits-list',
            view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
          ].join(' ')}
        >
          {props.hits.map((hit) => (
            <li key={hit.objectID} className="ais-Hits-item">
              <ConnectedHit hit={hit} />
            </li>
          ))}
        </ol>
      </div>

      <div className="uni-NoResults-SeeAll">
        <button
          className="uni-NoResults-SeeAllButton"
          onClick={props.onSeeAllClick}
        >
          See results in all categories
        </button>
      </div>
    </div>
  );
});

function QuerySuggestions() {
  const { searchState, searchParameters } = useAppContext();

  return (
    <Index indexName={QUERY_SUGGESTIONS_INDEX_NAME}>
      <Configure
        {...searchParameters}
        removeWordsIfNoResults="allOptional"
        query={searchState.query}
        hitsPerPage={4}
      />
      <QuerySuggestionsHits />
    </Index>
  );
}

const QuerySuggestionsHits = connectHits(function QuerySuggestionsHits(props) {
  const { setQuery } = useSearchContext();

  if (props.hits.length === 0) {
    return null;
  }

  return (
    <div className="uni-NoResults-Suggestions">
      <span className="uni-NoResults-SuggestionTitle">Search instead:</span>
      <ul className="uni-NoResults-SuggestionList">
        {props.hits.reduce(
          (node, hit, index) => [
            ...node,
            <li key={hit.objectID} className="uni-NoResults-SuggestionItem">
              <button
                className="uni-NoResults-SuggestionButton"
                onClick={() => {
                  setQuery(hit.query);
                }}
              >
                {hit.query}
              </button>
              {index < props.hits.length - 1 && ','}
            </li>,
          ],
          []
        )}
      </ul>
      .
    </div>
  );
});
