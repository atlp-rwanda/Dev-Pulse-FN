import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputTags from '../InputTags';
import { createSessions } from '../../../actions/sessions';
import { ErrorSnackBarMessage, SuccessSnackBarMessage } from '../SnackBarMessage';

class AddSessions extends Component {
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

handleAddSessions = () => {
  const { createSessions } = this.props;
  const { tags } = this.state;
  console.log('sessions', this.state.tags, this.props);
  if (tags.length) createSessions(tags);
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
      {/* <SuccessSnackBarMessage
        open={snackMessageData.open}
        message={snackMessageData.message}
        close={this.handleCloseSnackSuccess}
      /> */}
      {/* <ErrorSnackBarMessage
        open={snackMessageError.open}
        message={snackMessageError.message}
        close={this.handleCloseSnackSuccess}
      /> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="add-emails"
        >
          <h3>Add Sessions</h3>
        </AccordionSummary>
        <AccordionDetails className="addWrapper">
          <InputTags type={'session'} tags={tags} setTags={this.setTags} />
          <Button
            className="addButton"
            variant="contained"
            color="primary"
            onClick={this.handleAddSessions}
          >
            Add
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
}
AddSessions.propTypes = {
  emails: PropTypes.object.isRequired,
  createSessions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ emails: state.emailList || [] });

const mapDispatchToProps = {
  createSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSessions);
