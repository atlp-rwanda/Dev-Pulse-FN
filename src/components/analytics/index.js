import React, { Component } from 'react';
import { connect } from 'react-redux';
import TraaineesTable from '../shared/TraaineesTable';
import CohortDropDown from '../shared/CohortDropDown';
import {
  exportCohortRatings,
  resetExportRatings,
  selectCohort,
} from '../../actions/EngineerActions';
import ExportRatingsModal from '../shared/admin/ExportRatingsModal';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupClass: 'hidden',
      from: '',
      to: '',
    };
  }
  handelExport = () => {
    const { exportCohortRatings, selectedCohort } = this.props;
    exportCohortRatings(selectedCohort, {
      from: this.state.from,
      to: this.state.to,
    });
  };
  render() {
    return (
      <>
        <div className='emailsContainer'>
          <div className='tableHeader'>
            <p>Analytics</p>
            <div className='flex' style={{ alignItems: 'center' }}>
              <CohortDropDown />
              <button
                className='button'
                type='button'
                style={{ margin: '0 1rem' }}
                onClick={() => {
                  this.setState({ popupClass: 'block' });
                }}
              >
                Export All
              </button>
            </div>
          </div>
          <div className='flex'>
            <TraaineesTable />
          </div>
        </div>
        <ExportRatingsModal
          {...this.state}
          onFromChange={(e) =>
            this.setState({ ...this.state, from: e.target.value })
          }
          onToChange={(e) =>
            this.setState({ ...this.state, to: e.target.value })
          }
          handleClose={() => {
            this.setState({
              ...this.state,
              popupClass: 'hidden',
              from: '',
              to: '',
            });
            this.props.resetExportRatings();
          }}
          onDownload={() => {
            this.setState({
              ...this.state,
              popupClass: 'hidden',
              from: '',
              to: '',
            });
            this.props.selectCohort(0);
            this.props.resetExportRatings();
          }}
          data={this.props.ratingsToExport || []}
          fetchData={this.handelExport}
        />
      </>
    );
  }
}

const mapStateToProps = ({ engineer }) => ({
  trainees: engineer.trainees,
  selectedCohort: engineer.selectedCohort,
  ratingsToExport: engineer.ratingsToExport,
});
const mapDispatchToProps = (dispatch) => ({
  exportCohortRatings: (id, timeRange) =>
    dispatch(exportCohortRatings(id, timeRange)),
  fetchTrainees: () => dispatch(fetchAllUsers()),
  resetExportRatings: () => dispatch(resetExportRatings()),
  selectCohort: (id) => dispatch(selectCohort(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
