import React, { Component } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import './app.scss';

import FakeSearchBar from './top/FakeSearchBar';
import SearchBar from './top/SearchBar';
import LeftColumn from './left-column/LeftColumn';
import RightColumn from './right-column/RightColumn';

import { searchClient, createURL, urlToSearchState, searchStateToUrl } from './shared/Tools';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayDisplayed: true,
      searchState: urlToSearchState(props.location),
      lastLocation: props.location
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.getInstantSearchConfiguration = this.getInstantSearchConfiguration.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof props.location.state === 'undefined' || props.location !== state.lastLocation) {
      return {
        searchState: urlToSearchState(props.location),
        lastLocation: props.location,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
          searchStateToUrl(this.props, searchState),
          searchState
      );
    }, 400);

    this.setState({ searchState });
  };

  toggleDisplay = (overlayDisplayed = true) => {
    this.setState({ overlayDisplayed });
  };

  getInstantSearchConfiguration = () => {
    const { searchState: { refinementList } } = this.state;

    const ruleContexts = Object.keys(refinementList).reduce((all, refinementName) => {
      for (const refinementValue of refinementList[refinementName]) {
        all = [...all, `${refinementName}-${refinementValue.toLowerCase().replace(/ /g,"_")}`];
      }

      return all;
    }, [ ]);

    return {
      analytics: true,
      clickAnalytics:true,
      ruleContexts
    };
  };

  render() {
    const { overlayDisplayed, searchState } = this.state;

    return (
      <React.Fragment>
        <FakeSearchBar onInputClick={() => this.toggleDisplay(true)} />

        {overlayDisplayed &&
          <InstantSearch
                  searchClient={searchClient}
                  indexName="products"
                  searchState={searchState}
                  onSearchStateChange={this.onSearchStateChange}
                  createURL={createURL}>
            <Configure {...this.getInstantSearchConfiguration()} />
            <div id="euip-wrapper">
              <div className="euip">
                <SearchBar />
                <LeftColumn />
                <RightColumn />
              </div>
            </div>
          </InstantSearch>
        }
      </React.Fragment>
    );
  }
}

export default App;
