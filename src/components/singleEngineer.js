import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableContent from './singleContent';
import ProgramDropDown from './shared/ProgramDropDown';
import {
  fetchPrograms,
  fetchEngineer,
  fetchRating,
} from '../actions/EngineerActions';
import ChangeCohort from './shared/ChangeCohort';
import ChangeProgram from './shared/ChangeProgram';
import { Link } from 'react-router-dom';


class SingleEngineer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      feedback: null,
    };
  }

  componentDidMount() {
    const { match, engineer } = this.props;
    const { id } = match.params;
    const { fetchEngineer, fetchRating } = this.props;
    const token  = localStorage.getItem('pulseToken').split('.')[1];
    const userInfo = JSON.parse(atob(token));
    this.setState({...this.state,userInfo:userInfo})

    fetchEngineer(id);

    fetchRating(id);
  }

  openModal = (id) => {
    this.setState({ feedback: id });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ feedback: null });
  };

  handleRatings = (array) => {

    try {
      const items = [];
      if (array.length > 0 && array !== undefined) {
        array.map((engineer) => {
          const engineerRatings = {};
          engineerRatings.feedback = {};
          (engineerRatings.id = engineer.id),
            (engineerRatings.date =
              // engineer.updatedAt.split('T')[0]),
              engineer.sprintInfo?.name),
            (engineerRatings.quality =
              engineer.quality.rate),
            (engineerRatings.quantity =
              engineer.quantity.rate),
            (engineerRatings.communication =
              engineer.communication.rate),
            (engineerRatings.average = (
              (engineer.quality.rate +
                engineer.quantity.rate +
                engineer.communication.rate) /
              3
            ).toFixed(2)),
            items.push(engineerRatings);
        });
      }

      return items;
    } catch (ex) {}
  };

  handleFeedback = (array) => {
    const id = this.state.feedback;
    try {
      const items = [];
      if (array.length > 0 && array !== undefined) {
        array.map((engineer) => {
          const feedback = {};
          (feedback.id = engineer.id),
            (feedback.quality = engineer.quality.feedback),
            (feedback.quantity =
              engineer.quantity.feedback),
            (feedback.communication =
              engineer.communication.feedback),
            items.push(feedback);
        });
      }
      return items.find((item) => item.id === id);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleRate = (rate) => {
    if (!rate) return [];
    const { averageRating: average, ...rest } = rate;

    return [{ ...rest, date: 'Average', average }];
  };

  feed = (feedback) => {
    if (feedback !== undefined) {
      return (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => this.closeModal()}
            >
              &times;
            </span>
            <table className="tab">
              <tbody>
                <tr>
                  <td>Quality</td>
                  <td>{feedback.quality}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{feedback.quantity}</td>
                </tr>
                <tr>
                  <td>ProfessionalCommunication</td>
                  <td>{feedback.communication}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  render() {
    const { engineer } = this.props;
    const { user, cohorts} = engineer;
    const columns = [
      'Sprint',
      'Quality',
      'Quantity',
      'Professional Communication',
      'Average',
      'Action'
    ];
    let cohort = cohorts.find(e=>e.id === user.cohort)

    if(this.state.userInfo?.role=='Trainee'){
      columns.pop();
    }
    const userRole = localStorage.getItem('pulseRole');
    const items = this.handleRatings(
      engineer.ratings.filter((rate) => {
        if (
          rate.program === engineer.selectedProgram ||
          !engineer.selectedProgram
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
    const average = this.handleRate(engineer.average);
    const feedback = this.handleFeedback(engineer.ratings);

    const programm =
      engineer.programs &&
      engineer.programs.find(
        ({ id }) => id === this.props.selectedProgram
      );

      const getRatingToUpdate = (item)=>{
        
          this.props.history.push(`/rating/${user.id}/${item.id}`);
      }

    return (
      <>
        <div className="container">
          {this.feed(feedback)}
          <div>
            <ul
              className="profile-bar tableHeader light-box-shadow"
              style={{
                display: 'flex',
                fontSize: '14px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <li className="profile-bar-item">{`${user.firstName} ${user.lastName}`}</li>
              <li className="profile-bar-item">
                {' '}
                <strong>Email:</strong>
                {user.email}
              </li>
              <li className="profile-bar-item">
                <strong>Role: </strong>
                {user.role}
              </li>
              <li className="profile-bar-item">
                <strong>Cohort: </strong>
                {cohort ? cohort.name.split(' ')[1] : ''}

              </li>
              {userRole === 'Manager' && <ChangeCohort />}
              <li className="profile-bar-item">
                <strong>Program: </strong>
                {user.programInfo !== null
                  ? user.programInfo.name
                  : ''}
              </li>
              {userRole === 'Manager' && <ChangeProgram />}
              <li className="profile-bar-item">
                <ProgramDropDown />
              </li>
              {userRole === 'Manager' && (
                <li className="profile-bar-item">
                  <Link
                    className="btns"
                    to={'/ratings/rate/' + user.id}
                  >
                    Rate
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <table className="table">
              <tbody>
                <TableContent
                  isAVerage={true}
                  role={this.state.userInfo?.role}
                  data={
                    !this.props.selectedProgram
                      ? average
                      : this.handleRate(
                          engineer[
                            `${programm.name.replace(
                              /\s/,
                              ''
                            )}Average`
                          ]
                        )
                  }
                />
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
                <TableContent
                  data={items}
                  getRatingToUpdate={getRatingToUpdate}
                  openModal={this.openModal}
                  role={this.state.userInfo?.role}

                />
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

SingleEngineer.propTypes = {
  fetchEngineer: PropTypes.func.isRequired,
  fetchRating: PropTypes.func.isRequired,
  fetchPrograms: PropTypes.func.isRequired,
};

const mapStateToProps = ({ engineer }) => {
  return {
    engineer,
    selectedProgram: engineer.selectedProgram,
  };
};

export default connect(mapStateToProps, {
  fetchEngineer,
  fetchRating,
  fetchPrograms,
})(SingleEngineer);
