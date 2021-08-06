import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  selectCohort,
  fetchPrograms,
} from '../../actions/EngineerActions';

const baseUrl = process.env.API_URL;
class CohortDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: [],
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('pulseToken');
    axios
      .get(`${baseUrl}/api/v1/cohorts`, {
        method: 'GET',
        mode: 'cors',
        cashe: 'no-cashe',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      })
      .then((response) => {
        const cohort = response.data.data;
        this.setState({ cohorts: cohort });
      })
      .catch((err) => {
        console.log('there is some kind of error', err);
      });
  }
  render() {
    return (
      <div className="filter-container">
        <select
          className="filter-data filter-cohorts"
          onChange={(e) => {
            this.props.onChange(+e.target.value);
            this.props.fetchPrograms(+e.target.value);
          }}
          value={this.props.selectedCohort}
        >
          <option value={0}>All Cohorts</option>
          {this.state.cohorts.map((cohort) => {
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
  selectedCohort: engineer.selectedCohort,
  selectedProgram: engineer.selecttedProgram,
});
const mapDispatchToProps = (dispatch) => ({
  onChange: (cohort) => dispatch(selectCohort(cohort)),
  fetchPrograms: (cohortId) =>
    dispatch(fetchPrograms(cohortId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortDropDown);
