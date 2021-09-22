import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { myEngineers } from '../../actions/engineerList';
import { getAllAttendaceRecords } from '../../actions/attendance';
import ReactLoading from 'react-loading';


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
      color: "#3359DF",
    },
  },
};

const TraineeAverage = (props) => {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const { id } = props
  const all = attendances

  useEffect(() => {
    const attendanceData = props.state.attendance;
    if(attendanceData.records){
      setAttendances(attendanceData.records.attendances);
      setSessions(attendanceData.records.sessions);
    }
  }, [props.state.attendance]);
  useEffect(() => {
    props.getAllAttendaceRecords();
    props.myEngineers();

  }, [props.history]);

  useEffect(() => {
    const newSession = sessions.map((session) => {
      return { ...session, selector: session.name, sortable: true,cell:(row)=> <div className={parseFloat(row[session.name])< 1 ? 'text-red':''}> {row[session.name]} </div> }
    });
    const newData = all.filter(record => record.trainee ==id);
    const mapData = () => {
      const traineesAtt = _.groupBy(newData, 'session');
      const sessionsHere = Object.keys(traineesAtt);
      const sessionsAtt = sessionsHere.map((session) => {
        const mean = _.meanBy(traineesAtt[session], 'attendance');
        const traineeId = traineesAtt[session][0].trainee;
        const sessionName = sessions.find(s => s.id == session).name;
        return { [sessionName]: mean.toFixed(2), trainee: traineeId }
      });
      return sessionsAtt;
    }
    const mappedData = mapData();
    const finalData = () => {
      let x = {};
      mappedData.map((c) => {
        x = { ...x, ...c }
      });
      const n = Object.keys(x).length - 1;
      let sum = 0;
      Object.keys(x).map((key) => {
        if (key != 'name' && key != 'trainee') {
          sum = sum + parseFloat(x[key]);
        }
      })
      const average = sum / n;
      return { ...x, average: average.toFixed(2) };
    };

    new Promise(async resolve => {
      resolve(finalData());
    }).then(data => {
      setData([data]);
    })

    const newColumns = [...newSession, {
      name: 'Average',
      selector: 'average',
      sortable: true,
      cell:row=><div className={parseFloat(row.average) <1 ? 'text-red':''}>{row.average}</div>,
    }];
    setColumns(newColumns);
  }, [props.history,attendances]);

  return (
    <div>
       {!props.state.attendance.loading &&
      <DataTable columns={columns} data={data} customStyles={customStyles} noHeader responsive />
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

const mapDispatchToProps = {
  myEngineers,
  getAllAttendaceRecords
}

export default connect(mapStateToProps,mapDispatchToProps)(TraineeAverage);
