import React from 'react';
import {
  connectSearchBox,
  Index,
  connectHits,
  Configure,
} from 'react-instantsearch-dom';

import { ReverseHighlight } from '../ReverseHighlight';

export const PredictiveSearchBox = connectSearchBox((props) => {
  const [currentSuggestion, setCurrentSuggestion] = React.useState(null);
  const inputRef = React.createRef(null);

  function onSubmit(event) {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function onReset(event) {
    event.preventDefault();
    props.refine('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="ais-SearchBox">
      <form
        action=""
        role="search"
        noValidate
        className="ais-SearchBox-form"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <button className="ais-SearchBox-submit" type="submit" title="Search">
          <label
            className="ais-SearchBox-submitIcon"
            id="unified-label"
            htmlFor="unified-input"
          >
            <svg viewBox="0 0 18 18" width={16} height={16}>
              <path
                d="M13.14 13.14L17 17l-3.86-3.86A7.11 7.11 0 1 1 3.08 3.08a7.11 7.11 0 0 1 10.06 10.06z"
                stroke="currentColor"
                strokeWidth="1.78"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
        </button>

        <div
          className="ais-SearchBox-loadingIndicator"
          hidden={!(props.currentRefinement && props.isSearchStalled === true)}
        >
          <svg
            className="ais-SearchBox-loadingIcon"
            viewBox="0 0 38 38"
            width={18}
            height={18}
            stroke="currentColor"
            strokeOpacity=".5"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>

        <div className="ais-SearchBox-inputContainer">
          {currentSuggestion &&
            currentSuggestion !== props.currentRefinement && (
              <span className="ais-SearchBox-completion">
                {currentSuggestion}
              </span>
            )}

          <input
            ref={inputRef}
            className="ais-SearchBox-input"
            id="unified-input"
            aria-labelledby="unified-label"
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={64}
            autoFocus
            placeholder={props.translations.placeholder}
            value={props.currentRefinement}
            onChange={(event) => {
              setCurrentSuggestion(null);
              props.refine(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault();
                props.refine(currentSuggestion);
              }
            }}
          />
        </div>

        <button
          type="reset"
          title="Clear the query"
          className="ais-SearchBox-reset"
          hidden={!props.currentRefinement || props.isSearchStalled}
          onClick={props.onReset}
        >
          <svg
            className="ais-SearchBox-resetIcon"
            viewBox="0 0 10 10"
            width={16}
            height={16}
          >
            <path
              d="M5 4.12L8.93.18a.62.62 0 1 1 .89.89L5.88 5l3.94 3.93a.62.62 0 1 1-.89.89L5 5.88 1.07 9.82a.62.62 0 1 1-.89-.89L4.12 5 .18 1.07a.62.62 0 1 1 .89-.89L5 4.12z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </form>

      <Index indexName={props.suggestionsIndexName}>
        <Configure
          // @TODO: remove all refinements from parent index
          facets={[]}
          page={0}
          hitsPerPage={props.maxSuggestions}
        />
        <Suggestions
          query={props.currentRefinement}
          onSuggestion={(suggestion) => setCurrentSuggestion(suggestion)}
          onClick={(value) => props.refine(value)}
        />
      </Index>
    </div>
  );
});

const Suggestions = connectHits((props) => {
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
  }, [props.hits]);

  return (
    <div className="Unified-QuerySuggestions">
      <span className="Unified-QuerySuggestions-label">Suggestions</span>

      {props.hits.length > 0 ? (
        <ol className="Unified-QuerySuggestions-list">
          {props.hits.map((hit) => {
            return (
              <li key={hit.objectID} className="Unified-QuerySuggestions-item">
                <button
                  className="Unified-QuerySuggestions-button"
                  onClick={() => props.onClick(hit.query)}
                >
                  <ReverseHighlight hit={hit} attribute="query" />
                </button>
              </li>
            );
          })}
        </ol>
      ) : (
        'None'
      )}
    </div>
  );
});
