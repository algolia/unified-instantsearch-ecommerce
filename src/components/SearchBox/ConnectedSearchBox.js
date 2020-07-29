import React from 'preact/compat';
import { connectSearchBox } from 'react-instantsearch-dom';

import { useAppContext } from '../../hooks';
import { PredictiveSearchBox } from './PredictiveSearchBox';
import { SearchBox as SearchBoxComponent } from './SearchBox';

export const HeaderSearchBox = connectSearchBox(function SearchBox(props) {
  const { config, setSearchContext } = useAppContext();

  React.useEffect(() => {
    setSearchContext({ setQuery: props.refine });
  }, [setSearchContext, props.refine]);

  React.useEffect(() => {
    setSearchContext({ isSearchStalled: props.isSearchStalled });
  }, [setSearchContext, props.isSearchStalled]);

  if (config.suggestionsIndex) {
    return (
      <div className="uni-SearchBox">
        <PredictiveSearchBox
          translations={{
            placeholder: 'Search for a product, brand, color, …',
          }}
          {...props}
          suggestionsIndex={config.suggestionsIndex}
        />
      </div>
    );
  }

  return (
    <div className="uni-SearchBox">
      <SearchBoxComponent
        translations={{ placeholder: 'Search for a product, brand, color, …' }}
        {...props}
        onChange={(event) => {
          props.refine(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 27) {
            event.preventDefault();
            props.refine('');
          }
        }}
        onSubmit={() => {}}
        onReset={() => {
          props.refine('');
        }}
      />
    </div>
  );
});
