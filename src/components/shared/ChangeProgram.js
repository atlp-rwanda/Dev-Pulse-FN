import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { connect } from 'react-redux';
import {
  fetchPrograms,
  updateEngineerCohort,
} from '../../actions/EngineerActions';
import axios from 'axios';

const baseUrl = process.env.API_URL;

class ChangeProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.program,
      users: this.props.user.programInfo.name,
      userCohort: this.props.user.cohort,
    };
  }
  async getProgram() {
    this.props.selectedProgram;
    this.props.changeProgram;
  }
  componentDidMount() {
    this.getProgram();
  }
  render() {
    const programm =
      this.props.programs &&
      this.props.programs.find(
        ({ id }) => id === this.props.selectedProgram
      );
    return (
      <div className="cohorts-change">
        <CgArrowsExchangeAltV
          style={{ fontSize: '24px' }}
        />
        <div className="change-cohort">
          {this.props.programs.map((program) => {
            const programId = program.id;
            const programName = program.name;
            return (
              <p
                key={program.id}
                onClick={() => {
                  const token =
                    localStorage.getItem('pulseToken');
                  console.log(token);
                  if (
                    this.state.user !== programId ||
                    this.state.userName !== programName
                  ) {
                    axios.defaults.headers.common[
                      'Authorization'
                    ] = `Bearer ${token}`;
                    axios.put(
                      `${baseUrl}/api/v1/users/${this.props.user.id}/program/${programId}`
                    );
                    this.props.updateProgram({
                      programInfo: {
                        id: programId,
                        name: programName,
                      },
                    });
                    return this.setState({
                      users: programName,
                    });
                  } else {
                    console.log('did not update cohort');
                  }
                }}
              >
                {program.name}
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
  programs: engineer.programs,
  selectedProgram: engineer.selectedProgram,
  ChangeProgram: engineer.changeProgramName,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrograms: (programs) =>
    dispatch(fetchPrograms(programs)),
  updateProgram: (updatedProgram) =>
    dispatch(updateEngineerCohort(updatedProgram)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeProgram);
