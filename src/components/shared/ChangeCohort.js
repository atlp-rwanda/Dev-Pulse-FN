import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { connect } from 'react-redux';
import {
  fetchCohorts,
  updateEngineerCohort,
} from '../../actions/EngineerActions';
import axios from 'axios';

const baseUrl = process.env.API_URL;

class ChangeCohort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.cohort,
    };
  }

  async getCohorts() {
    this.props.selectedCohort;
  }
  componentDidMount() {
    this.getCohorts();
    // this.handleClick();
  }
  render() {
    console.log(
      'fetch on change cohort',
      this.props.cohorts,
      this.props.user.id,
      'fetch engineer',
      this.state.user
    );
    return (
      <div className="cohorts-change">
        <CgArrowsExchangeAltV
          style={{ fontSize: '24px' }}
        />
        <div className="change-cohort">
          {this.props.cohorts.map((cohort) => {
            console.log('filter', cohort);
            const cohortId = cohort.id;
            return (
              <p
                key={cohort.id}
                onClick={() => {
                  const token =
                    localStorage.getItem('pulseToken');
                  console.log(token);
                  if (this.state.user !== cohortId) {
                    axios.defaults.headers.common[
                      'Authorization'
                    ] = `Bearer ${token}`;
                    axios.put(
                      `${baseUrl}/api/v1/users/${this.props.user.id}/cohort/${cohortId}`
                    );
                    this.props.updateCohort({
                      cohortId,
                      cohort: cohortId,
                    });
                    return this.setState({
                      user: cohortId,
                    });
                  } else {
                    console.log('did not update cohort');
                  }
                }}
              >
                {cohort.name}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ engineer }) => ({
  user: engineer.user,
  cohorts: engineer.cohorts,
  selectedCohort: engineer.selectedCohort,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCohorts: (fetchCohort) =>
    dispatch(fetchCohorts(fetchCohort)),
  updateCohort: (changeCohort) =>
    dispatch(updateEngineerCohort(changeCohort)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCohort);
