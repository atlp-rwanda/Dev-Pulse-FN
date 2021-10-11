import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'

const EngineerFilters = (props) => {
    const [allCohorts,setAllCohorts] = useState([{name:'ok',id:1}]);
    const [cohortsTrainees,setCohortsTrainees] = useState([]);
    const [selectedCohort,setSelectedCohort] = useState('all');
    const [selectedProgram,setSelectedProgram] = useState('all');
    const [cohortsPrograms,setCohortPrograms] = useState([]);
    const { cohorts ,programs,allEngineers,filterByCohort } = props;
    

    useEffect(()=>{
        if(!cohorts.loading){
            setAllCohorts(cohorts.cohorts);
        }
    },[cohorts])

    useEffect(()=>{
      if(selectedCohort !== 'all'){
      setCohortPrograms(programs.programs.filter(program => program.cohortId === parseInt(selectedCohort)));
      return filterByCohort(cohortsTrainees);
      }
      setCohortPrograms([]);
      filterByCohort(allEngineers);
    },[cohortsTrainees])


    useEffect(()=>{
      if(selectedProgram!=='all'){
        const programCohortsTrainees = cohortsTrainees.filter(engineer => engineer.program === parseInt(selectedProgram));
        return filterByCohort(programCohortsTrainees);
      }
      filterByCohort(cohortsTrainees);
    },[selectedProgram]);

    const onCohortChange = (e) => {
        const cohortId = e.target.value;
        setSelectedCohort(cohortId);
        const filteredEngineers = allEngineers.filter(engineer => engineer.cohort === parseInt(cohortId));
        setCohortsTrainees(filteredEngineers);
    }
    const onProgramChange = (e) => {
        const programId = e.target.value;
        setSelectedProgram(programId);
    }
    return (
            <div className='data'>
            <div className='filters'>
              <select onChange={onCohortChange} {...props} className='select filter-data select-big'>
                <option value='all'>All</option>
                {allCohorts.map(({name,id})=>{
                    return <option value={id} key={id}>{name}</option>
                })}

              </select>
              <select onChange={onProgramChange}  {...props} className='select filter-data select-big ml-10'>
                <option value='all'>All</option>
                {cohortsPrograms.map(({name,id})=>{
                    return <option value={id} key={id}>{name}</option>
                })}
              </select>
            </div>
            </div>
    )
}
const mapStateToProps = (state) => ({
    cohorts: state.cohorts,
    programs: state.programs,
  });
export default connect(mapStateToProps)(EngineerFilters);