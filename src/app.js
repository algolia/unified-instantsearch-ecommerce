import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { isMobile } from 'react-device-detect';

import config from './config.js';

import FakeSearchBar from './shared/FakeSearchBar';
import Main from './main/Main';

import Configuration from './shared/Configuration';
import QueryRulesHandler from './shared/QueryRulesHandler';
import QueryRulesBanner from './shared/QueryRulesBanner';
import {
  searchClient,
  createURL,
  urlToSearchState,
  searchStateToUrl,
  shouldDisplayOverlayAtLaunch,
} from './shared/Tools';

import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    const searchState = urlToSearchState(props.location);

    this.state = {
      searchState: searchState,
      lastLocation: props.location,
      overlayDisplayed: shouldDisplayOverlayAtLaunch(searchState),
      searchResultsDisplayed: true
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.overlayDisplayed !== this.state.overlayDisplayed) {
      if (this.state.overlayDisplayed) {
        document.body.classList.add('with-euip-modal-open');
      } else {
        this.resetSearchState();
        document.body.classList.remove('with-euip-modal-open');
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location !== state.lastLocation) {
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

      if (config.googleAnalytics) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

    this.setState({ searchState });
  };

  setSearchStatePage = page => {
    const { searchState } = this.state;
    const newSearchState = { ...searchState, page: (page) > 0 ? page : 1 };

    this.setState({ searchState: newSearchState }, () => this.onSearchStateChange(newSearchState));
  };

  setSearchStateSortBy = sortBy => {
    const { searchState } = this.state;
    const newSearchState = { ...searchState, sortBy };

    this.setState({ searchState: newSearchState }, () => this.onSearchStateChange(newSearchState));
  };

  resetSearchState = () => {
    this.setState({ searchState: urlToSearchState({ search: '' }) });
  };

  displayOverlay = (overlayDisplayed = true) => {
    this.setState({ overlayDisplayed });
  };

  displaySearchResults = (searchResultsDisplayed = true) => {
    if (this.state.searchResultsDisplayed !== searchResultsDisplayed) {
      this.setState({ searchResultsDisplayed });
    }
  };

  render() {
    const { overlayDisplayed, searchResultsDisplayed, searchState } = this.state;

    return (
      <React.Fragment>
        <FakeSearchBar onInputClick={() => this.displayOverlay(true)} />

        {overlayDisplayed &&
          <InstantSearch searchClient={searchClient}
            indexName={config.indexName || 'products'}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={createURL}
          >
            <Configuration />
            <QueryRulesHandler searchState={searchState} />
            <QueryRulesBanner shouldDisplaySearchResults={this.displaySearchResults} />

            <div id="euip-wrapper" onScroll={() => console.log("FIXME")} className={`${isMobile ? 'mobile' : 'desktop'}`}>
              <div className="euip">
                {searchResultsDisplayed &&
                  <Main displayOverlay={this.displayOverlay}
                    setSearchStateSortBy={this.setSearchStateSortBy}
                    setSearchStatePage={this.setSearchStatePage} page={searchState.page} />
                }
              </div>
            </div>
          </InstantSearch>
        }
      </React.Fragment>
    );
  }
}

export default App;
