import React, { Component } from 'react';
import {
  NavLink,
  Link,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { getEmailsList } from '../actions/emailList';
import AddEmails from './shared/admin/addEmails';
import RemoveEmails from './shared/admin/removeEmails';

class AuthorizedEmails extends Component {
  componentDidMount() {
    console.log('executing getemails');
    this.props.getEmails();
  }

  handleCopy = (e) => {
    console.log(e.target.id);
    navigator.clipboard.writeText(e.target.id);
  };

  render() {
    const { emails } = this.props.emails;
    return (
      <>
        <div className="emailsContainer">
          <p className="tableHeader">
            Manage allowed emails
          </p>
          <div className="maincontainer">
            <div className="addRemoveWrapper">
              <div className="addSection">
                <AddEmails />
              </div>
              <div className="removeSection">
                <RemoveEmails emailsList={emails} />
              </div>
            </div>
            <div className="viewEmailsContainer">
              <h3>All authorized emails</h3>
              <div className="allEmails">
                {emails.length ? null : (
                  <h5>No email(s) saved yet</h5>
                )}
                {emails.map((eachEmail) => (
                  <div
                    className="eachEmail"
                    key={eachEmail.email}
                  >
                    <p>{eachEmail.email}</p>
                    <button
                      id={eachEmail.email}
                      onClick={this.handleCopy}
                      type="button"
                    >
                      <FileCopyOutlinedIcon
                        id={eachEmail.email}
                        onClick={this.handleCopy}
                        className="removeIcon"
                        color="secondary"
                      />
                    </button>
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
  emails: state.emailList || [],
});
const mapDispatchToProps = (dispatch) => ({
  getEmails: () => dispatch(getEmailsList()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorizedEmails);
