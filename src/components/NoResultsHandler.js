import React from 'preact/compat';
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
  const { view } = useAppContext();

  if (props.searchState.query && props.searchResults?.nbHits === 0) {
    return (
      <NoResults
        query={props.searchState.query}
        isSearching={props.searching}
      />
    );
  }

  if (
    props.isSearchStalled &&
    (!props.searchResults || props.searchResults.nbHits === 0)
  ) {
    return (
      <div className="ais-Hits">
        <ol
          className={[
            'ais-Hits-list uni-Hits',
            view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
          ].join(' ')}
        >
          {Array.from({ length: 12 }, (_, i) => i).map((index) => (
            <li key={index} className="ais-Hits-item uni-Hits-item">
              <article className="uni-Hit">
                <div className="uni-Hit-placeholder" />
              </article>
            </li>
          ))}
        </ol>
      </div>
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
        <HitsPreview />
      </Index>

      <div className="uni-NoResults-SeeAll">
        <button
          className="uni-NoResults-SeeAllButton"
          onClick={(event) => {
            event.preventDefault();
            props.refine(props.items);
          }}
        >
          See results in all categories
        </button>
      </div>
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
            'ais-Hits-list uni-Hits',
            view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
          ].join(' ')}
        >
          {props.hits.map((hit) => (
            <li key={hit.objectID} className="ais-Hits-item uni-Hits-item">
              <ConnectedHit hit={hit} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
});

function QuerySuggestions() {
  const { config, searchState, searchParameters } = useAppContext();

  if (!config.suggestionsIndex) {
    return null;
  }

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
        {props.hits.map((hit, index) => (
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
          </li>
        ))}
      </ul>
      .
    </div>
  );
});
