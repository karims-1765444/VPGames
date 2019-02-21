import { connect } from "react-redux";
import * as pageActions from "../redux/actions/HomePage";
import HomePage from "../components/HomePage";

function mapStateToProps(state) {

  const {
    areEventsFetched,
    displayedEvents,
    events,
    matches,
    icons
  } = state.HomePage;

  return {
    areEventsFetched,
    events,
    matches,
    displayedEvents,
    icons
  };
}

//maps every function to its corresponding action
const mapDispatchToProps = {
  getEvents: pageActions.getAllEvents,
  filterEvents: pageActions.filterEvents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
