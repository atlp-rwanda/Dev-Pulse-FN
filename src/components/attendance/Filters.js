import React from 'react'

const Filters=(props)=> {
    const {cohorts,setCohortValue,programRef,setProgramValue,cohortPrograms} = props;
    return (
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
    )
}

export default Filters
