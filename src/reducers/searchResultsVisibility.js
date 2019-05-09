const searchResultsVisibility = (state = true, action) => {
  switch (action.type) {
    case 'SET_RESULTS_VISIBILITY':
      return action.showResults
    default:
      return state
  }
}

export default searchResultsVisibility