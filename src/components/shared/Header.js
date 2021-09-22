import React, { Component } from 'react';
import {
  NavLink,
  Link,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { fetchProfile } from '../../actions/fetchProfile';

class Header extends Component {
  adminDashboard = null;

  componentDidMount() {
    const tkn = localStorage.getItem('pulseToken');
    if (tkn) {
      this.props.getProfile();
    }
    console.log('proooooooooooooo', this.props.profile);
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    if (profile.success) {
      console.log('new profile', profile);
      if (profile.success.data.role === 'Manager') {
        this.adminDashboard = (
          <li>
            <NavLink to="/admin" title="Admin Dashboard">
              <i className="fas fa-user" />
              <span className="m-1">Admin</span>
            </NavLink>
          </li>
        );
      }
    }
  }

  logOut = () => {
    localStorage.removeItem('pulseToken');
  };

  render() {
    const userRole = localStorage.getItem('pulseRole');
    return (
      <>
        <nav className="navbar">
          <NavLink to="/" >
            <img className="logo-img" src="https://res.cloudinary.com/bahati/image/upload/v1572334416/samples/Mystuff/pulse_vjdvgh.png" />
          </NavLink>
          <h1>
            <i className="fas fa-code" /> PULSE
          </h1>
          <ul>
            {this.adminDashboard}
            {userRole === 'Manager' && (
              <li>
                <NavLink to="/profile" title="Dashboard">
                  <i className="fas fa-user" />
                  <span className="m-1">Profile</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/attendance"
                title="attendance"
                activeClassName='active-nav'
              >
                <i className="fas fa-list-alt " />
                <span className="m-1">Attendance</span>

              </NavLink>
            </li>
            <li>
              <Link
                onClick={() => this.logOut()}
                to="/login"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(fetchProfile()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
