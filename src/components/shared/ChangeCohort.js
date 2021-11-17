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
      program: this.props.user.programId,
      programInfo: this.props.user.programInfo,
    };
  }
  async getCohorts() {
    this.props.selectedCohort;
  }
  componentDidMount() {
    this.getCohorts();
    console.log('props user', this.props.user.programInfo);
    // this.handleClick();
  }
  render() {
    return (
      <div className="cohorts-change">
        <CgArrowsExchangeAltV
          style={{ fontSize: '24px' }}
        />
        <div className="change-cohort">
          {this.props.cohorts.map((cohort) => {
            return (
              <p
                key={cohort.id}
                onClick={() => {
                  const cohortId = cohort.id;
                  const token =
                    localStorage.getItem('pulseToken');
                  if (this.state.user !== cohortId) {
                    axios.defaults.headers.common[
                      'Authorization'
                    ] = `Bearer ${token}`;
                    axios.put(
                      `${baseUrl}/api/v1/users/${this.props.user.id}/cohort/${cohortId}`
                    );
                    this.props.updateCohort({
                      cohort: cohortId,
                      program: null,
                      programInfo: null,
                    });
                    return this.setState({
                      user: cohortId,
                      program: null,
                      programInfo: null,
                    });
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
  program: engineer.user,
  cohorts: engineer.cohorts,
  programInfo: engineer.programInfo,
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
