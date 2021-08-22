import React from 'react';
import { connect } from 'react-redux';
import {
  selectCohort,
  fetchPrograms,
  fetchCohorts,
} from '../../actions/EngineerActions';

class CohortDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  async getCohorts() {
    await this.props.fetchCohorts(
      this.props.selectedCohort
    );
  }

  componentDidMount() {
    this.getCohorts();
  }
  render() {
    const { cohorts } = this.props;
    return (
      <div className="filter-container">
        <select
          className="filter-data filter-cohorts"
          onChange={(e) => {
            this.props.onChange(+e.target.value);
            this.props.fetchPrograms(+e.target.value);
            this.props.fetchCohorts(+e.target.value);
          }}
          value={this.props.selectedCohort}
        >
          <option value={0}>All Cohorts</option>
          {this.props.cohorts.map((cohort) => {
            return (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
const mapStateToProps = ({ engineer }) => ({
  cohorts: engineer.cohorts,
  selectedCohort: engineer.selectedCohort,
  selectedProgram: engineer.selectedProgram,
});
const mapDispatchToProps = (dispatch) => ({
  onChange: (cohort) => dispatch(selectCohort(cohort)),
  fetchPrograms: (cohortId) =>
    dispatch(fetchPrograms(cohortId)),
  fetchCohorts: (cohorts) =>
    dispatch(fetchCohorts(cohorts)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortDropDown);
