import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputTags from '../InputTags';
import { saveAuthorizedEmail } from '../../../actions/emailList';
import { ErrorSnackBarMessage, SuccessSnackBarMessage } from '../SnackBarMessage';

class AddEmails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
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
    if (emails.addSuccess.status) {
      this.setState({
        tags: [],
        snackMessageData: {
          open: true,
          message: emails.addSuccess.message,
        },
      });
    }
    if (emails.addError.status) {
      this.setState({
        snackMessageError: {
          open: true,
          message: emails.addError.message,
        },
      });
    }
  }

setTags = (tag) => {
  this.setState({ tags: [...tag] });
}

handleAddEmails = () => {
  const { saveAuthorizedEmail } = this.props;
  const { tags } = this.state;
  console.log('emals', this.state.tags, this.props);
  if (tags.length) saveAuthorizedEmail(tags);
  return null;
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
  const { tags } = this.state;
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="add-emails"
        >
          <h3>Add Emails</h3>
        </AccordionSummary>
        <AccordionDetails className="addWrapper">
          <InputTags tags={tags} setTags={this.setTags} />
          <Button
            className="addButton"
            variant="contained"
            color="primary"
            onClick={this.handleAddEmails}
          >
            Add
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
}
AddEmails.propTypes = {
  emails: PropTypes.object.isRequired,
  saveAuthorizedEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ emails: state.emailList || [] });

const mapDispatchToProps = {
  saveAuthorizedEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmails);
