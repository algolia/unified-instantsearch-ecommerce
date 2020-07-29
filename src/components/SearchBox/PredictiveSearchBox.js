import React from 'preact/compat';
import { Index, connectHits, Configure } from 'react-instantsearch-dom';

import { QUERY_SUGGESTIONS_INDEX_NAME } from '../../constants';
import { ReverseHighlight } from '../ReverseHighlight';
import { SearchBox } from './SearchBox';

export const PredictiveSearchBox = (props) => {
  const [suggestion, setSuggestion] = React.useState(null);

  return (
    <>
      <SearchBox
        {...props}
        completion={
          props.currentRefinement &&
          suggestion &&
          suggestion !== props.currentRefinement
            ? suggestion
            : null
        }
        onChange={(event) => {
          setSuggestion(null);
          props.refine(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          // When the user hits the right arrow and is at the end of the
          // input query, we validate the completion.
          if (
            event.key === 'Tab' ||
            (event.keyCode === 39 &&
              event.target.selectionStart === props.currentRefinement.length)
          ) {
            event.preventDefault();
            props.refine(suggestion);
          } else if (event.keyCode === 27) {
            event.preventDefault();
            props.refine('');
          }
        }}
        onSubmit={() => {}}
        onReset={() => {
          props.refine('');
        }}
      />

      <Index indexName={QUERY_SUGGESTIONS_INDEX_NAME}>
        <Configure {...props.suggestionsIndex.searchParameters} />
        <Suggestions
          query={props.currentRefinement}
          onSuggestion={setSuggestion}
          onClick={(value) => {
            props.refine(value);
            setSuggestion(null);
          }}
        />
      </Index>
    </>
  );
};

const Suggestions = connectHits(function Suggestions({
  query,
  hits,
  onSuggestion,
  onClick,
}) {
  const firstSuggestion = hits[0]?.query;

  React.useEffect(() => {
    if (!firstSuggestion || !query) {
      onSuggestion(null);
      return;
    }

    if (firstSuggestion.toLocaleLowerCase().startsWith(query.toLowerCase())) {
      // We correct any case mismatch between the query and the suggestion.
      // Example:
      // If the typed query has a different casing than the suggestion, we want
      // to show the completion matching the case of the query. This makes both
      // strings overlap correctly.
      //  - query: 'Gui'
      //  - suggestion: 'guitar'
      //  => Query completion: 'Guitar'
      const suggestion = query + firstSuggestion.slice(query.length);
      onSuggestion(suggestion);
    }
  }, [firstSuggestion, query, onSuggestion]);

  return (
    <div
      className={[
        'uni-QuerySuggestions',
        hits.length === 0 && 'uni-QuerySuggestions--empty',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="uni-QuerySuggestions-label">Suggestions</span>

      {hits.length > 0 && (
        <ol className="uni-QuerySuggestions-list">
          {hits.map((hit) => {
            return (
              <li key={hit.objectID} className="uni-QuerySuggestions-item">
                <button
                  className="uni-QuerySuggestions-button"
                  onClick={() => onClick(hit.query)}
                >
                  <ReverseHighlight hit={hit} attribute="query" />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
});
