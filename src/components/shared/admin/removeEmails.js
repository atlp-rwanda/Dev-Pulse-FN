/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Snackbar, TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { addEngineer } from '../../actions/engineerList';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmationDialog from '../DeleteConfirmPopup';
import { removeAuthorizedEmail } from '../../../actions/emailList';
import { ErrorSnackBarMessage, SuccessSnackBarMessage } from '../SnackBarMessage';

class RemoveEmails extends Component {
  snack = null;

  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      openDialog: false,
      snackMessageData: {
        open: false,
        message: '',
      },
      snackMessageError: {
        open: false,
        message: '',
      },
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    const { emails } = nextProps;
    if (emails.removeSuccess.status) {
      console.log('selected values', emails);
      this.setState({
        emails: [],
        snackMessageData: {
          open: true,
          message: emails.removeSuccess.message,
        },
      });
      console.log('prrrrrrrrrrrrrrrrrrops', this.state);
    }
    if (emails.removeError.status) {
      console.log('failed in will props.......', emails);
      this.setState({
        snackMessageError: {
          open: true,
          message: emails.removeError.message,
        },
      });
    }
  }

  handleChange = (event, value) => this.setState({ emails: value })

  handleRemoveEmails = () => {
    const { removeAuthorizedEmail } = this.props;
    console.log('going to be removed', this.state.emails);
    const emails = [];
    this.state.emails.map((email) => emails.push(email.email));
    console.log('actualemails', emails, emails.length);
    removeAuthorizedEmail(emails);
    return this.setState({ openDialog: false });
  }

    confirmDeleteEmails = () => {
      if (this.state.emails.length) {
        return this.openConfirDialog();
      }
      return null;
    }

    closeDialog = () => this.setState({ openDialog: false });

    openConfirDialog = () => {
      console.log('changing click');
      this.setState({ openDialog: true });
    }

    handleCloseSnackSuccess = () => {
      this.setState({
        snackMessageData: {
          open: false,
          message: '',
        },
        snackMessageError: {
          open: false,
          message: '',
        },
      });
    }

    render() {
      console.log('passedEmails', this.props);
      const { emailsList } = this.props;
      const { snackMessageData, snackMessageError } = this.state;
      return (
        <>
          <SuccessSnackBarMessage
            open={snackMessageData.open}
            message={snackMessageData.message}
            close={this.handleCloseSnackSuccess}
          />
          <ErrorSnackBarMessage
            open={snackMessageError.open}
            message={snackMessageError.message}
            close={this.handleCloseSnackSuccess}
          />
          <ConfirmationDialog
            openDialog={this.state.openDialog}
            closeDialog={this.closeDialog}
            items={this.state.emails.length}
            confirmed={this.handleRemoveEmails}
          />

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="remove-emails"
            >
              <h3>Remove Emails</h3>
            </AccordionSummary>
            <AccordionDetails className="removeWrapper">
              <Autocomplete
                multiple
                className="autoCompleteInput"
                options={emailsList}
                getOptionLabel={(option) => option.email}
                value={this.state.emails}
                onChange={this.handleChange}
                filterSelectedOptions
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Add comma separated emails"
                    />
                  </>
                )}
              />
              <Button
                onClick={this.confirmDeleteEmails}
                className="removeButton"
                variant="contained"
                color="secondary"
              >
                Remove
                {' '}
              </Button>
            </AccordionDetails>
          </Accordion>
        </>
      );
    }
}

const mapStateToProps = (state) => ({ emails: state.emailList || [] });

const mapDispatchToProps = {
  removeAuthorizedEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveEmails);
