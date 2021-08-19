import React from 'react';
import { connect } from 'react-redux';
import {
  selectProgram,
  fetchPrograms,
} from '../../actions/EngineerActions';

class ProgramDropDown extends React.Component {
  constructor(props) {
    super(props);
  }
  async changeProgram() {
    await this.props.fetchPrograms(
      this.props.selectedCohort
    );
  }
  componentDidMount() {
    this.changeProgram();
  }

  render() {
    return (
      <div className="filter-container">
        <select
          className="filter-data filter-programs"
          onChange={(e) => {
            this.props.onChange(+e.target.value);
          }}
        >
          <option value={0}>All Programs</option>
          {this.props.programs.map((program) => {
            return (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ engineer }) => ({
  programs: engineer.programs,
  selectedCohort: engineer.selectedCohort,
  selectedProgram: engineer.selectedProgram,
});
const mapDispatchToProps = (dispatch) => ({
  onChange: (program) => dispatch(selectProgram(program)),
  fetchPrograms: (cohortId) =>
    dispatch(fetchPrograms(cohortId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDropDown);
