/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { authUser } from '../actions/authAction';
import { fetchProfile } from '../actions/fetchProfile';
import '../styles/authLogin.scss';
import loginLogo from '../assets/pulse_logo.svg';

export class AuthPage extends Component {
    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      authUser: PropTypes.func.isRequired,
      auth: PropTypes.object,
    };

    constructor(props) {
      super(props);
    }

    componentDidMount() {
         const pulseToken = localStorage.getItem('pulseToken');
      if (pulseToken) {
        console.log("<=====token fecthing profile=====>")
        
        this.props.getProfile();

        console.log("<=====Done token fecthing profile=====>")

      }
      const { location } = this.props;
      const base64encoded = location.search.split('&')[0].split('?code=')[1];
      if (base64encoded) {
        const decoded = JSON.parse(atob(base64encoded));
        console.log("Decoded=====>",decoded )


        this.props.authUser(decoded);
      }
    }

     componentWillReceiveProps(nextProps) {
      console.log("component will update*******",nextProps)
      const {
        auth, history, profile, getProfile,
      } = nextProps;
      if (auth.user.token) {
        localStorage.setItem('pulseToken', auth.user.token);
      }
      if (localStorage.getItem('pulseToken') && !profile) { // to avoid infinite recursion
        getProfile();
      }          

      if (profile.success) {
        switch (profile.success.data.role) {
          case 'Trainee':
            history.push(`/users/${profile.success.data.id}`);
            break;
          case 'Manager':
            history.push('/profile');
            break;
          case 'Lead':
            history.push('/add-lf');
            break;
          default:
            history.push('/login');
        }
      
    }
    }

    render() {
      return (
        <div className="authPage">
          <div className="login">
            <div className="pulse-login">
              <div className="logo">
                <span>
                  <img src={loginLogo} alt="logo" style={{ width: '110px' }} />
                </span>
              </div>
              <div className="pulse-title">
                <h1>
PULSE
                </h1>
              </div>
              <a className="btn-login" href="http://localhost:3000/api/v1/users/auth/google">
                <span className="icon" />
                <span className="login-txt">Sign in to get started</span>
              </a>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {

  console.log("state updateddddddd  ",state)
    



  return {auth:state.auth,profile:state.profile};
}
const mapDispatchToProps = (dispatch) => ({
  authUser: (data) => dispatch(authUser(data)),
  getProfile: () => dispatch(fetchProfile()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AuthPage);
