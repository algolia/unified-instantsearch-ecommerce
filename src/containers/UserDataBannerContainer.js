import { connect } from "react-redux";
import { setSearchResultsVisibility } from "../actions";
import UserDataBanner from "../top/UserDataBanner";

const mapDispatchToProps = (dispatch) => ({
    toggleResults: (value) => dispatch(setSearchResultsVisibility(value))
});

export default connect(
    null,
    mapDispatchToProps
)(UserDataBanner);
