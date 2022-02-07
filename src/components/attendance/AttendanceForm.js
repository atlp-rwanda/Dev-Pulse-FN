import React, { useEffect, useState, useRef } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { getUserInfo } from '../../helpers/token';
import DataTable from 'react-data-table-component';
// import { sessions } from '../../__mocks__/mockData';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { myEngineers } from '../../actions/engineerList'
import { SaveAttendance } from '../../actions/attendance';
import { getAllAttendaceRecords } from '../../actions/attendance';
import { getAllCohorts } from '../../actions/cohorts'
import { getAllPrograms } from '../../actions/programs'
import { toast } from 'react-toastify';
import Filters from './Filters';


const customStyles = {

  headCells: {
    style: {
      backgroundColor: '#3359DF',
      fontSize: '17px',
      color: '#fff'
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      color: "#3359DF"
    },
  },
}


const AttendanceForm = ({ history, ...props }) => {
  const { role } = getUserInfo();
  const [data, setData] = useState([]);
  const [attObject, setAttObject] = useState({});
  const [modal, setModal] = useState(false);
  const [traineeId, setTraineeId] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [cohort, setCohort] = useState('all');
  const [program, setProgram] = useState('all');
  const sessionRef = useRef();
  const linkRef = useRef();
  const { state: { cohorts, programs } } = props;
  const programRef = useRef();
  const [cohortPrograms, setCohortPrograms] = useState([]);
  const [cohortTrainees, setCohortTrainees] = useState([]);
  const [myTrainees, setMyTrainees] = useState([]);
  const [filterChanged, setFilterChanged] = useState(false);
  const [sprint,setSprint]=useState(null);


  const openDialog = (id) => {
    setModal(true);
    setTraineeId(id);
  }

  const handleChange = (id, prop, newValue) => {
    const obj = attObject;
    obj[id][0][prop] = newValue;
    setAttObject({ ...attObject, });
    console.log(attObject);
  };

  useEffect(() => {
    if (props.state.attendance.records) {
      setSessions(props.state.attendance.records.sessions);
    }

  }, [props.state.attendance]);
  useEffect(() => {
    if (myTrainees.length > 0) {
      const groupByUser = _.groupBy(myTrainees, 'id');
      setAttObject(groupByUser);
    }

  }, [myTrainees])
  useEffect(() => {
    if (role != 'Manager') {
      history.push('/attendance');
    }
    if (role == 'Manager') {
      const engineerList = props.state.engineersReducer.engineers;
      if (engineerList.length == 0) {
        props.myEngineers();
        props.getAllAttendaceRecords();
        props.getAllCohorts(),
        props.getAllPrograms()
      } else {
        const trainees = engineerList.map((trainee) => {
          return { ...trainee, attendance: 0, comment: '' }
        })
        if (data.length < 1) {
          setData(trainees);
        }
      }

    }
  }, [data, attObject]);

  useEffect(() => {
    if (cohort === 'all' && program === 'all') {
      setMyTrainees(props.state.engineersReducer.engineers);
      setFilterChanged(!filterChanged);
    }

  }, [cohort, program, props.state.engineersReducer.engineers]);

  useEffect(() => {
    if (cohorts.cohorts && cohorts.cohorts.length > 0 && programs.programs) {
      if (cohort != 'all') {
        const ProgramByCohort = programs.programs.filter(program => program.cohortId === parseInt(cohort));
        setCohortPrograms(ProgramByCohort);
      }
    }

  }, [cohorts, cohort])

  const setProgramValue = (val) => {
    setProgram(val);
    sortByProgram(val);
  }

  const sortByProgram = (p) => {
    if (p != 'all') {
      const trainees = cohortTrainees.filter(trainee => trainee.program === parseInt(p));
      setMyTrainees(trainees);
      setFilterChanged(!filterChanged);
    }
  }
  const sortByCohort = (c) => {
    if (c != 'all') {
      const allEngineers = props.state.engineersReducer.engineers;
      const trainees = allEngineers.filter(trainee => trainee.cohort === parseInt(c));
      setCohortTrainees(trainees);
      setMyTrainees(trainees);
      console.log(trainees);
      setFilterChanged(!filterChanged);
      programRef.current.value = 'all';
    }
  }
  const setCohortValue = async (val) => {
    setCohort(val);
    sortByCohort(val);
  }



  const columns = [{
    name: 'Trainee',
    selector: 'name',
  },
  {
    name: '2',
    cell: ({ id }) => <div> <input
      className='form-check-input'
      style={{height: "24px", width: "24px", verticalAlign: "middle"}}
      onChange={() => handleChange(id, 'attendance', 2)}
      type="radio"
      name={`radio-button-demo-${id}`}
    /></div>,
    center: true,
  },
  {
    name: '1',
    cell: ({ id }) => <div > <input
      className='form-check-input'
      style={{height: "24px", width: "24px", verticalAlign: "middle"}}
      onChange={() => handleChange(id, 'attendance', 1)}
      type="radio"
      name={`radio-button-demo-${id}`}
    /></div>,
    center: true,
  },
  {
    center: true,
    name: '0',
    cell: ({ id }) => <div> <input
      className='form-check-input'
      style={{height: "24px", width: "24px", verticalAlign: "middle"}}
      onChange={() => handleChange(id, 'attendance', 0)}
      type="radio"
      name={`radio-button-demo-${id}`}
    />
      <i onClick={() => openDialog(id)} style={{ marginLeft: '13px', cursor: 'pointer', position: 'absolute', marginTop: '8px' }} className="fas fa-ellipsis-h ml-2"></i>
    </div>
  },
  ];
  const defaultValue = (x) => {
    if (attObject && attObject[x]) {
      return attObject[x][0].comment
    }
    return x;
  }

  const isChecked = (id) => {
    if (attObject && attObject[id]) {
      return (attObject[id][0].attendance);
    }
  }

  const setActiveSprint=(id)=>{
    setSprint(id);
  }

  const saveAttendance = async () => {
    if(!sprint){
      toast.error('sprint is required');
      return false;
    }
     const getAllRecords =  Object.keys(attObject).map((key) => {
        return {...attObject[key][0]}
      });
      const prepare = getAllRecords.filter(record => record.attendance>=0);
      const finalData =_.groupBy(prepare, 'id');
    const data = { data: finalData, sessionId: sessionRef.current.value,sprintId:sprint };
    setSaving(true);
    const saved = await props.SaveAttendance(data);
    if (!saved.success) {
      setSaving(false);
      return toast.error('Failed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
    toast.success('Attendance recorded!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    try{
      props.getAllAttendaceRecords();
    }catch(e){
      console.log(e);
    }
    history.push('/attendance');
  }
  return (
    <div className='attendance-wrapper'>
      <div className='data'>
        <div className='att-controls'>
          <div className='filterss'>
            <select ref={sessionRef} className='select filter-data'>
              {sessions.map((session, index) => (
                <option key={index} value={session.id}>{session.name}</option>
              ))}
            </select>
          </div>
          <Filters setSprint={setActiveSprint} cohorts={cohorts} setCohortValue={setCohortValue} programRef={programRef} setProgramValue={setProgramValue} cohortPrograms={cohortPrograms} />
          <button disabled={saving} className='btns' onClick={saveAttendance}>
            {saving ? 'Saving ...' : 'Save'}
          </button>
        </div>
        <div className='att-table'>
          <DataTable columns={columns} data={myTrainees} customStyles={customStyles} noHeader responsive pagination />
        </div>
      </div>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
      >
        <DialogTitle >Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <textarea defaultValue={defaultValue(traineeId)} className='comment-textarea' onChange={(e) => handleChange(traineeId, 'comment', e.target.value)}></textarea>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToprops = {
  myEngineers,
  SaveAttendance,
  getAllAttendaceRecords,
  getAllCohorts,
  getAllPrograms
};

export default connect(mapStateToProps, mapDispatchToprops)(withRouter(AttendanceForm));
