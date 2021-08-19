import React, { Component } from 'react';
import {
  NavLink,
  Link,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { getAllSessions } from '../actions/sessions';
import AddSessions from './shared/admin/AddSession';
import RemoveSessions from './shared/admin/RemoveSessions';

class AuthorizedEmails extends Component {
  componentDidMount() {
    this.props.getSessions();
  }

  handleCopy = (e) => {
    console.log(e.target.id);
    navigator.clipboard.writeText(e.target.id);
  };

  render() {
    const { sessions } = this.props.sessions;
    return (
      <>
        <div className="emailsContainer">
          <p className="tableHeader">
            Sessions
          </p>
          <div className="maincontainer">
            <div className="addRemoveWrapper">
              <div className="addSection">
                <AddSessions />
              </div>
              <div className="removeSection">
                <RemoveSessions sessionsList={sessions} />
              </div>
            </div>
            <div className="viewEmailsContainer">
              <h3>Available sessionsHere</h3>
              <div className="allEmails">
                {sessions.length ? null : (
                  <h5>No sessions saved yet</h5>
                )}
                {sessions.map((session) => (
                  <div
                    className="eachEmail"
                    key={session.name}
                  >
                    <p>{session.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  sessions: state.sessions || [],
});
const mapDispatchToProps = (dispatch) => ({
  getSessions: () => dispatch(getAllSessions()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorizedEmails);
