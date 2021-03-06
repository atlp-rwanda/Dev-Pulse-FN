/* eslint-disable import/no-named-as-default */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './shared/Header';
import HomePage from './HomePage';
import singleEngineer from './singleEngineer';
import ManageRatingsPage from './rate/ManageRatingsPage';
import AddLf from './AddLf';
import NotFoundPage from './shared/NotFound';
import '../styles/App.scss';
import '../styles/authLogin.scss';
import PrivateRoute from './PrivateRoute';
import EngineerList from './egineerList';
import AuthPage from './AuthPage';
import AdminDashboard from './AdminDashboard';
import AuthorizeEmails from './AuthorizeEmails';
import ManageCohorts from './ManageCohorts';
import { fetchCohorts, fetchPrograms,fetchPendingRatings } from '../actions/EngineerActions';
import Attendance from './attendance/Attendance';
import AttendanceForm from './attendance/AttendanceForm';
import TraineeView from './attendance/TraineeView';
import Sessions from './Sessions';
import RateAll from './rate/RateAll';
import Analytics from './analytics';
import ModifyRating from './rate/ModifyRating';
import UpdatedRatings from './rate/UpdatedRatings';



class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  adminLocation = location.pathname.split('/', 3);

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { cohorts, programs, fetchCohorts, fetchPrograms,fetchPendingRatings,pendingRatings,profile} = this.props;
    if (!cohorts.length) fetchCohorts();
    if (!programs.length) fetchPrograms();
    if (!pendingRatings.data && localStorage.getItem('pulseToken')) fetchPendingRatings();

  }

  render() {
    const { location } = this.props;
    return (
      <>
      <ToastContainer />
      {location.pathname === '/login' ? null : location.pathname
          .split('/', 3)
          .includes('admin') ? (
        <AdminDashboard />
      ) : (
        <Header />
      )}
      <Switch>
        <Route exact path='/' component={AuthPage}>
          <Redirect to='/login' />
        </Route>
          <Route path='/login' component={AuthPage} />
          <Route path='/add-lf' component={AddLf} />
          <PrivateRoute path='/profile' component={HomePage} />
          <PrivateRoute path='/admin' exact component={AdminDashboard} />
          <PrivateRoute path='/admin/emails' component={AuthorizeEmails} />
          <PrivateRoute path='/admin/cohorts' component={ManageCohorts} />
          <PrivateRoute path='/users/:id' component={singleEngineer} />
          <PrivateRoute
            path='/ratings/rate/:engId'
            component={ManageRatingsPage}
          />
          <PrivateRoute exact path='/list' component={EngineerList} />
          <PrivateRoute exact path='/attendance' component={Attendance} />
          <PrivateRoute
            exact
            path='/attendance/new'
            component={AttendanceForm}
          />
          <PrivateRoute
            exact
            path='/attendance/trainee/:id'
            component={TraineeView}
          />
          <PrivateRoute exact path='/admin/sessions' component={Sessions} />
          <PrivateRoute
            path='/ratings/rate/all'
            component={ManageRatingsPage}
          />
          <PrivateRoute exact path='/admin/analytics' component={Analytics} />
          <PrivateRoute exact path='/admin/ratings' component={UpdatedRatings} />
          
          <PrivateRoute
            path='/rating/:engId/:ratingId'
            component={ModifyRating}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cohorts: state.engineer.cohorts,
  programs: state.engineer.programs,
  pendingRatings:state.pendingRatings,
  profile:state.profile
});

const mapDispatchToprops = (dispatch) => ({
  fetchCohorts: () => dispatch(fetchCohorts()),
  fetchPrograms: () => dispatch(fetchPrograms()),
  fetchPendingRatings:()=>dispatch(fetchPendingRatings())

});

export default connect(mapStateToProps, mapDispatchToprops)(withRouter(App));
