import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CsvDownload from 'react-json-to-csv';
import {
  fetchAllUsers,
  exportTraineeRatings
} from '../../actions/EngineerActions';

class TraineesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupClass: 'hidden',

      from: '',
      to: '',
      btn: 'disabled'
    };
  }
  async fetchTrainees() {
    await this.props.fetchTrainees();
  }
  handelExport(id) {
    this.props.exportTraineeRatings(id, {
      from: this.state.from,
      to: this.state.to
    });
  }
  componentDidMount() {
    this.fetchTrainees();
  }

  render() {
    const { trainees, ratingsToExport } = this.props;

    const columns = [
      'First Name',
      'Last Name',
      'Email',
      'Joined',
      'Graduated',
      'Action'
    ];
    return (
      <div className='filter-container'>
        <div>
          <table className='table'>
            <tbody>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
              {trainees.map((item, i) => (
                <>
                  <tr key={i}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <Link to={`/users/${item.id}`} className='name'>
                        {item.email}
                      </Link>
                    </td>

                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.graduated === false ? 'False' : 'True'}</td>

                    <td>
                      <button
                        className='button'
                        type='button'
                        onClick={() => {
                          this.setState({ popupClass: 'block' });
                        }}
                      >
                        Export
                      </button>
                    </td>
                  </tr>
                  <div className={`${this.state.popupClass} popup-container`}>
                    <div className='popup'>
                      <button
                        className='close '
                        onClick={() => {
                          this.setState({ popupClass: 'hidden' });
                        }}
                      >
                        X
                      </button>
                      <div className='flex pt-4'>
                        <div>
                          <p>Select Start Date</p>
                          <input
                            type='date'
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                from: e.target.value
                              });
                            }}
                          />
                        </div>
                        <div>
                          <p>Select End Date</p>
                          <input
                            type='date'
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                to: e.target.value
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className='export'>
                        {ratingsToExport.length ? (
                          <CsvDownload
                            data={ratingsToExport}
                            filename='traineeRatings.csv'
                            className='button'
                          >
                            Download
                          </CsvDownload>
                        ) : (
                          <button
                            className='button'
                            type='button'
                            onClick={() => this.handelExport(item.id)}
                          >
                            Retrieve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ engineer }) => ({
  trainees: engineer.trainees,
  ratingsToExport: engineer.ratingsToExport
});
const mapDispatchToProps = (dispatch) => ({
  exportTraineeRatings: (id, timeRange) =>
    dispatch(exportTraineeRatings(id, timeRange)),
  fetchTrainees: () => dispatch(fetchAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(TraineesTable);
