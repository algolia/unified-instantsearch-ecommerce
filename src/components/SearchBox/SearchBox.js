import React from 'preact/compat';

export const SearchBox = (props) => {
  const inputRef = React.useRef(null);

  function onSubmit(event) {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    props.onSubmit();
  }

  function onReset(event) {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    props.onReset();
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

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
          hidden={
            props.currentRefinement.length === 0 ||
            props.isSearchStalled === false
          }
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
          {props.completion && (
            <span className="ais-SearchBox-completion">{props.completion}</span>
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
            maxLength={512}
            placeholder={props.translations.placeholder}
            value={props.currentRefinement}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
          />
        </div>

        <button
          type="reset"
          title="Clear the query"
          className="ais-SearchBox-reset"
          hidden={props.currentRefinement.length === 0 || props.isSearchStalled}
          onClick={onReset}
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
    </div>
  );
};
