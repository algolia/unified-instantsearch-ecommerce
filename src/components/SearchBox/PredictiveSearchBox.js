import React from 'react';
import { Index, connectHits, Configure } from 'react-instantsearch-dom';

import { ReverseHighlight } from '../ReverseHighlight';
import { SearchBox } from './SearchBox';

export const PredictiveSearchBox = (props) => {
  const [currentSuggestion, setCurrentSuggestion] = React.useState(null);

  return (
    <>
      <SearchBox
        {...props}
        completion={
          props.currentRefinement &&
          currentSuggestion &&
          currentSuggestion !== props.currentRefinement
            ? currentSuggestion
            : null
        }
        onChange={(event) => {
          setCurrentSuggestion(null);
          props.refine(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          // When the user hits the right arrow and is at the end of the
          // input query, we validate the completion.
          if (
            event.key === 'Tab' ||
            (event.key === 'ArrowRight' &&
              event.target.selectionStart === props.currentRefinement.length)
          ) {
            event.preventDefault();
            props.refine(currentSuggestion);
          }
        }}
        onSubmit={() => {}}
        onReset={() => {
          props.refine('');
        }}
      />

      <Index indexName={props.suggestionsIndex.indexName}>
        <Configure page={0} {...props.suggestionsIndex.searchParameters} />
        <Suggestions
          query={props.currentRefinement}
          onSuggestion={(suggestion) => setCurrentSuggestion(suggestion)}
          onClick={(value) => {
            props.refine(value);
            setCurrentSuggestion(null);
          }}
        />
      </Index>
    </>
  );
};

const Suggestions = connectHits(function Suggestions(props) {
  React.useEffect(() => {
    if (props.hits.length === 0) {
      props.onSuggestion(null);
      return;
    }

    const firstSuggestion = props.hits[0].query;

    if (
      firstSuggestion &&
      firstSuggestion.toLocaleLowerCase().startsWith(props.query.toLowerCase())
    ) {
      const suggestion =
        props.query + firstSuggestion.slice(props.query.length);
      props.onSuggestion(suggestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.hits]);

  return (
    <div
      className={[
        'uni-QuerySuggestions',
        props.hits.length === 0 && 'uni-QuerySuggestions--empty',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="uni-QuerySuggestions-label">Suggestions</span>

      {props.hits.length > 0 && (
        <ol className="uni-QuerySuggestions-list">
          {props.hits.map((hit) => {
            return (
              <li key={hit.objectID} className="uni-QuerySuggestions-item">
                <button
                  className="uni-QuerySuggestions-button"
                  onClick={() => props.onClick(hit.query)}
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
