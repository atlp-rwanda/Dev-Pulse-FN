import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Snackbar,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmationDialog from '../DeleteConfirmPopup';
import { removeSessions } from '../../../actions/sessions';
import {
  ErrorSnackBarMessage,
  SuccessSnackBarMessage,
} from '../SnackBarMessage';

class RemoveSessions extends Component {
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

  handleChange = (event, value) =>
    this.setState({ emails: value });

  handleRemoveSessions = () => {
    const { removeSessions } = this.props;
    const emails = [];
    this.state.emails.map((email) =>
      emails.push(email.id)
    );
    removeSessions(emails);
    return this.setState({ openDialog: false });
  };

  confirmDeleteEmails = () => {
    if (this.state.emails.length) {
      return this.openConfirDialog();
    }
    return null;
  };

  closeDialog = () => this.setState({ openDialog: false });

  openConfirDialog = () => {
    console.log('changing click');
    this.setState({ openDialog: true });
  };

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
  };

  render() {
    const { sessionsList } = this.props;
    const { snackMessageData, snackMessageError } =
      this.state;
    return (
      <>
        {/* <SuccessSnackBarMessage
          open={snackMessageData.open}
          message={snackMessageData.message}
          close={this.handleCloseSnackSuccess}
        />
        <ErrorSnackBarMessage
          open={snackMessageError.open}
          message={snackMessageError.message}
          close={this.handleCloseSnackSuccess}
        /> */}
        <ConfirmationDialog
          openDialog={this.state.openDialog}
          closeDialog={this.closeDialog}
          items={this.state.emails.length}
          confirmed={this.handleRemoveSessions}
          label ={'session(s)'}
        />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="remove-emails"
          >
            <h3>Remove Sessions</h3>
          </AccordionSummary>
          <AccordionDetails className="removeWrapper">
            <Autocomplete
              multiple
              className="autoCompleteInput"
              options={sessionsList}
              getOptionLabel={(option) => option.name}
              value={this.state.emails}
              onChange={this.handleChange}
              filterSelectedOptions
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Add comma separated sessions"
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
              Remove{' '}
            </Button>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
}
RemoveSessions.propTypes = {
  emails: PropTypes.object.isRequired,
  removeSessions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emails: state.emailList || [],
});

const mapDispatchToProps = {
  removeSessions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveSessions);
