import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { connect } from 'react-redux';
import { myEngineers } from '../../actions/engineerList';
import ReactLoading from 'react-loading';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#3359DF',
      fontSize: '17px',
      color: '#fff'
    }
  },
  cells: {
    style: {
      fontSize: '15px',
      color: '#3359DF'
    }
  }
};

const TraineeAverage = (props) => {
  const [myTrainees, setMyTrainees] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [id, setId] = useState(null);
  const [columns, setColumns] = useState([]);
  const { profile } = props;
  const [records, setRecords] = useState([]);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  const all = attendances;

  const getTrainee = (id) => {
    return myTrainees.find((trainee) => trainee.id == id);
  };
  const getSession = (id) => {
    return sessions.find((session) => session.id == id);
  };
  const displayComment = (row) => {
    setShowComment(true);
    setComment(row.comment);
  };

  const Columns = [
    {
      name: 'Sprint',
      cell: (row) => (
        <div className='pointer' onClick={() => displayComment(row)}>
          {row.sprint?.name}
        </div>
      ),
      sortable: true
    },
    {
      name: 'Session',
      cell: (row) => (
        <div className='pointer' onClick={() => displayComment(row)}>
          {getSession(row.session)?.name}
        </div>
      ),
      sortable: true
    },
    {
      name: 'Record',
      cell: (row) => (
        <div
          className='pointer'
          className={parseFloat(row.attendance) < 1 ? 'text-red' : 'text-green'}
          onClick={() => displayComment(row)}
        >
          {row.attendance}
        </div>
      ),
      sortable: true
    }
  ];
  useEffect(() => {
    const attendanceData = props.state.attendance;
    if (attendanceData.records) {
      setAttendances(attendanceData.records.attendances);
      setSessions(attendanceData.records.sessions);
    }
  }, [props.state.attendance]);

  useEffect(() => {
    setId(props.id);
    const traineeRecords = all.filter((r) => r.trainee == props.id);
    console.log(traineeRecords);
    setRecords(traineeRecords);
  }, [props.id, attendances]);

  useEffect(() => {
    setColumns(Columns);
  }, [sessions]);
  useEffect(() => {
    const allTrainees = props.state.engineersReducer.engineers;
    if (allTrainees.length > 0) {
      setMyTrainees(allTrainees);
    }
  }, [props]);
  return (
    <div>
      {!props.state.attendance.loading && (
        <div>
          {id && (
            <DataTable
              columns={columns}
              data={records}
              customStyles={customStyles}
              noHeader
              responsive
              pagination
            />
          )}
        </div>
      )}
      {props.state.attendance.loading && (
        <div className='loaderContainer'>
          <ReactLoading
            type={'bubbles'}
            color={'#5d82ca'}
            height={100}
            width={100}
          />
        </div>
      )}

      <Dialog open={showComment} onClose={() => setShowComment(false)}>
        <DialogTitle>{''}</DialogTitle>
        <DialogContent>
          <DialogContentText>{comment}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowComment(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToprops = {
  myEngineers
};
export default connect(mapStateToProps, mapDispatchToprops)(TraineeAverage);
