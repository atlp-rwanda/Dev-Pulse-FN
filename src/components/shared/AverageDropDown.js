import React from 'react';
import { connect } from 'react-redux';
import { averageRating } from '../../actions/EngineerActions';

class BelowAverage extends React.Component {
  render() {
    return (
      <div className="filter-container">
        <select
          className="filter-data filter-programs"
          onChange={(e) => {
            this.props.onChange(e.target.value);
          }}
          value={this.props.average}
        >
          <option value={0}>{this.props.default}</option>
          <option value={1}>Lower Average</option>
        </select>
      </div>
    );
  }
}
BelowAverage.defaultProps = { default: 'All trainees' };
const mapStateToProps = ({ engineer }) => ({
  average: engineer.averageRating,
});
const mapDispatchToProps = (dispatch) => ({
  onChange: (payload) => dispatch(averageRating(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BelowAverage);
