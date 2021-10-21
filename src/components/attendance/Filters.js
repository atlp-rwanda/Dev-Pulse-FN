import React,{useState} from 'react'

const Filters=(props)=> {
    const {cohorts,setCohortValue,programRef,setProgramValue,cohortPrograms,setSprint} = props;
    const[allSprints,setAllSprints]=useState([]);

    const changeProgram=(id)=>{
      setSprint(0);
      setProgramValue(id);
      const selectedProgram  = cohortPrograms.filter(program=>program.id==id);
      const sprints = selectedProgram[0]?.sprints || [];
      setAllSprints(sprints);
      setSprint(sprints[0]?.id);
    
    }
    const cohortChange=(id)=>{
      setSprint(0);
      setAllSprints([]);
      setCohortValue(id);
    }
    const changeSprint=(e)=>{
      setSprint(e.target.value);
    }

    return (
        <div className='filters'>
        <select className='select filter-data' onChange={(e) => cohortChange(e.target.value)}>
          <option value='all'>All</option>
          {cohorts.cohorts && cohorts.cohorts.map(({ name, id }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <select ref={programRef} className='select filter-data' onChange={(e) => changeProgram(e.target.value)}>
          <option value='all'>All</option>
          {cohortPrograms.map(({ name, id }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <select style={{marginLeft:'10px'}} onChange={changeSprint} ref={programRef} className='select filter-data'>
          {allSprints.map(({ name, id }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
       
      </div>
    )
}

export default Filters
