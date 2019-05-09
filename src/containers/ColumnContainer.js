import { connect } from 'react-redux'
import Column from '../shared/Column'

const mapStateToProps = state => {
    return ({
        displayResults: state.searchResultsVisibility
    })
}

export default connect(
    mapStateToProps,
    null
)(Column)