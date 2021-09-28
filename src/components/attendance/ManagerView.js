import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';

import { myEngineers } from '../../actions/engineerList';

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
};

const ManagerView = (props) => {
  const { state: { cohorts, programs } } = props;
  const [columns, setColumns] = useState([]);
  const [myTrainees, setMyTrainees] = useState([]);
  const [data, setData] = useState([]);
  const [cohort, setCohort] = useState('all');
  const [program, setProgram] = useState('all');
  const [filterChanged, setFilterChanged] = useState(false);
  const [cohortPrograms, setCohortPrograms] = useState([]);
  const [cohortTrainees, setCohortTrainees] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const programRef = useRef();
  useEffect(() => {
    const attendanceData = props.state.attendance;
    if (attendanceData.records) {
      setAttendances(attendanceData.records.attendances);
      setSessions(attendanceData.records.sessions);
    }


  }, [props.state.attendance]);

  const all = attendances

  useEffect(() => {
    const totalEngineers = props.state.engineersReducer.engineers;
    if (totalEngineers.length > 0) {

      const newSession = sessions.map((session) => {
        return { ...session, selector: session.name, sortable: true ,cell:(row)=> <div className={parseFloat(row[session.name])< 1 ? 'text-red':''}> {row[session.name]} </div> }
      }
      );
      const newData = myTrainees.map((trainee) => {
        const traineeAtt = all.filter(record => record.trainee == trainee.id);

        const traineeAttendance= traineeAtt.length > 0 ? traineeAtt : [{trainee:trainee.id,name:trainee.name}];

        return traineeAttendance;
      });

      const mapData = newData.map((data) => {
       const traineeAttendance = data.map((record) => {
         return parseInt(record.attendance);
       });
       const totalRecords = data.length;
       const sumOfAttendance = traineeAttendance.reduce((a, b) => a + b, 0);
       const averageAttendance = sumOfAttendance / totalRecords;

        const traineesAtt = _.groupBy(data, 'session');
        const sessionsHere = Object.keys(traineesAtt);
       
        const sessionsAtt = sessionsHere.map((session) => {
          const mean = _.meanBy(traineesAtt[session], 'attendance');
          const traineeId = traineesAtt[session][0].trainee;
          const sessionNameExists = sessions.find(s => s.id === parseInt(session));
          if(sessionNameExists){
            const sessionName = sessionNameExists.name;
            return { totalAverage:averageAttendance,[sessionName]: mean.toFixed(2), trainee: traineeId, name: myTrainees.find(t => t.id === traineeId).name }
          }
          return {trainee: traineeId, name: myTrainees.find(t => t.id === traineeId).name}

        });
        return sessionsAtt;
      });

      const finalData = mapData.map((data) => {
        const { totalAverage } = data;

        let x = {};
        data.map((c) => {
          x = { ...x, ...c }
        });
        const n = Object.keys(x).length - 2;
        let sum = 0;
        Object.keys(x).map((key) => {

          if (key !== 'name' && key !== 'trainee' && key !== 'totalAverage') {
            sum = sum + parseFloat(x[key]);
          }
        })

        // const average = (sum > 0 ? sum / n : 0);
        const average = totalAverage ? totalAverage.toFixed(2) : 0;

        return { ...x, average: average };
      });
      setData(finalData);
      const newColumns = [{
        name: 'Trainee',
        sortable: true,
        selector: 'name',
        cell: row => <Link className='att-link' to={`/attendance/trainee/${row.trainee}`}>{row.name}</Link>,
      }, ...newSession, {
        name: 'Average',
        selector: 'totalAverage',
        cell:row=><div className={parseFloat(row.totalAverage) <1 ? 'text-red':''}>{parseFloat(row.totalAverage).toFixed(2)}</div>,
        sortable: true,
      }];
      setColumns(newColumns);
    }

    if (totalEngineers.length <1) {
      props.myEngineers();
      setMyTrainees(props.state.engineersReducer.engineers);
    }


  }, [props.history, filterChanged, attendances]);

  useEffect(() => {
    if (cohorts.cohorts && cohorts.cohorts.length > 0 && programs.programs) {
      if (cohort != 'all') {
        const ProgramByCohort = programs.programs.filter(program => program.cohortId === parseInt(cohort));
        setCohortPrograms(ProgramByCohort);
      }
    }

  }, [cohorts, cohort])

  useEffect(() => {
    if (cohort === 'all' && program === 'all') {
      setMyTrainees(props.state.engineersReducer.engineers);
      setFilterChanged(!filterChanged);
    }

  }, [cohort, program, props.state.engineersReducer.engineers]);

  const setCohortValue = async (val) => {
    setCohort(val);
    sortByCohort(val);
  }
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
      setFilterChanged(!filterChanged);
      programRef.current.value = 'all';
    }
  }

  return (
    <div className='attendance-wrapper'>
      {!props.state.attendance.loading &&
        <div className='data'>
          <div className='att-controls'>
            <Link to='/attendance/new' className='add-btn btn'>
              <i className='fas fa-plus'></i>
            </Link>

            <div className='filters'>
              <select className='select filter-data' onChange={(e) => setCohortValue(e.target.value)}>
                <option value='all'>All</option>
                {cohorts.cohorts && cohorts.cohorts.map(({ name, id }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              <select ref={programRef} className='select filter-data' onChange={(e) => setProgramValue(e.target.value)}>
                <option value='all'>All</option>
                {cohortPrograms.map(({ name, id }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='att-table'>
            <DataTable columns={columns} data={data} customStyles={customStyles} noHeader responsive pagination />
          </div>
        </div>
      }
      {props.state.attendance.loading &&
        <div className='loaderContainer'>
          <ReactLoading type={'bubbles'} color={"#5d82ca"} height={100} width={100} />
        </div>}


    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    state: state
  }
};

const mapDispatchToprops = {
  myEngineers,
};
export default connect(mapStateToProps, mapDispatchToprops)(ManagerView);
