import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { isMobile } from 'react-device-detect';

import config from './config.js';

import FakeSearchBar from './top/FakeSearchBar';
import Top from './top/Top';
import Main from './shared/Main';

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
        document.body.classList.remove('with-euip-modal-open');
      }
    }
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );

      if (config.GOOGLE_ANALYTICS) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

    this.setState({ searchState });
  };

  displayOverlay = (overlayDisplayed = true) => {
    this.setState({ overlayDisplayed });
  };

  displaySearchResults = (searchResultsDisplayed = true) => {
    if (this.state.searchResultsDisplayed !== searchResultsDisplayed) {
      this.setState({ searchResultsDisplayed });
    }
  };

  changeSearchStatePage = pageOffset => {
    let { searchState } = this.state;
    const newSearchState = { ...searchState, page: searchState.page + pageOffset }

    this.setState({ searchState: newSearchState }, () => this.onSearchStateChange(newSearchState));
  }

  render() {
    const { overlayDisplayed, searchResultsDisplayed, searchState } = this.state;

    return (
      <React.Fragment>
        <FakeSearchBar onInputClick={() => this.displayOverlay(true)} />

        {overlayDisplayed &&
          <InstantSearch searchClient={searchClient}
            indexName={config.INDEX_NAME || 'products'}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={createURL}>
            <Configuration searchState={searchState} hitsPerPage={config.HITS.hitsPerPage} />
            <QueryRulesHandler searchState={searchState} />
            <QueryRulesBanner shouldDisplaySearchResults={this.displaySearchResults} />

            <div id="euip-wrapper" className={`${isMobile ? 'mobile' : 'desktop'}`}>
              <div className="euip">
                <Top />
                {searchResultsDisplayed && <Main changeSearchStatePage={this.changeSearchStatePage} />}
              </div>
            </div>
          </InstantSearch>
        }
      </React.Fragment>
    );
  }
}

export default App;
