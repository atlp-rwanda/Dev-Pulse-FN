import React, { useState, useEffect, useRef } from 'react'
import "../../styles/ratings.scss";
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllPrograms  } from './../../actions/programs'
import { getAllCohorts } from './../../actions/cohorts'
import EngineerFilters from '../EngineerFilters';
import rateAllTrainees from '../../actions/rating';
import { withRouter } from 'react-router';
import {ImSpinner} from 'react-icons/im';






const RateAll = (props) => {
    const defaultValues = {
        quality: {
            spec: 'null',
            feedback: ''
        },
        quantity: {
            spec: 'null',
            feedback: ''
        },
        communication: {
            spec: 'null',
            feedback: ''
        }
    }
    const myTrainees = useSelector(store => store.engineersReducer.engineers);
    const allPrograms  = useSelector(store=>store.programs);
    const allCohorts = useSelector(store=>store.cohorts);
    const [ratableTrainees, setRatableTrainees] = useState([]);
    const [state, setState] = useState({});
    const [fieldsData, setFieldsData] = useState(defaultValues);
    const [activeTrainee, SetActiveTrainee] = useState(null);
    const [sortedTrainees,setSortedTRainees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sprints,setSprints] = useState([]);
    const [activeSprint,setActiveSprint] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!allCohorts.cohorts){
            getAllCohorts()(dispatch);
        }
        if(!allPrograms.programs){
            getAllPrograms()(dispatch);
        }

    },[allCohorts,allPrograms])

    const select = useRef(null);
    const textbox = useRef(null);
    const specref = useRef(null)
    const rateSpec = [
        "quality",
        "quantity",
        "communication"
    ];

    useEffect(() => {
        const data = myTrainees.filter(trainee => trainee.program > 0);
        setSortedTRainees(data);
        setRatableTrainees(data);
    }, [myTrainees]);
    useEffect(() => {
        if (ratableTrainees.length > 0) {
            SetActiveTrainee(ratableTrainees[0].id);
        }
    }, [ratableTrainees])

    const onSpecChange = async (e) => {
        const specValue = parseInt(e.target.value);

        if (specValue >= 0) {
            const specName = e.target.name;
            const existingData = state[activeTrainee] ? state[activeTrainee] : {};
            const existingSpecData = existingData[specName] ? existingData[specName] : {};
            const newSpecRecord = { ...state, [activeTrainee]: { ...existingData, [specName]: { ...existingSpecData, rate: specValue},trainee:activeTrainee } };
            setFieldsData({ ...fieldsData, [specName]: { ...fieldsData[specName], spec: specValue } })
            setState(newSpecRecord);
        }

    }

    const onFeedback = (e) => {
        const specValue = e.target.value;
        const specName = e.target.name;
        const existingData = state[activeTrainee] ? state[activeTrainee] : {};
        const existingSpecData = existingData[specName] ? existingData[specName] : {};
        const newSpecRecord = { ...state, [activeTrainee]: { ...existingData, [specName]: { ...existingSpecData, feedback: specValue },trainee:activeTrainee } };
        setFieldsData({ ...fieldsData, [specName]: { ...fieldsData[specName], feedback: specValue } })
        setState(newSpecRecord);
    }

    const changeTrainee = (e) => {
        const newTraineeId = parseInt(e.target.value);
        const stateData = state;
        const activeTraineeHasAnyRecord = stateData[activeTrainee];

        if (activeTraineeHasAnyRecord) {
            for (const spec of rateSpec) {
                const rated = () => {
                    if (activeTraineeHasAnyRecord[spec]?.rate > -1) {
                        return true;
                    }
                    return false;
                }
                if (!activeTraineeHasAnyRecord[spec] ||
                    !activeTraineeHasAnyRecord[spec].feedback ||
                    !activeTraineeHasAnyRecord[spec] || !rated()) {
                    select.current.value = activeTrainee
                    return toast.error(`Please complete ${spec}`);
                }
            }
            setFieldsData(defaultValues);
            SetActiveTrainee(newTraineeId);
        } else {
            SetActiveTrainee(newTraineeId);
        }
    }
    const onRate=async()=>{
        setLoading(true);
        if(!activeSprint){
            setLoading(false);
            toast.error('Sprint is required');
            return 0;
        }
        const rating = await rateAllTrainees(state,activeSprint)(dispatch);
        setLoading(false);
       if(rating){
           props.history.push('/profile');
       }
    }

    const filterByCohort=(data)=>{
        setSortedTRainees(data)
    }
    const getProgramSprints=(id)=>{

        const selectedProgram = allPrograms.programs.filter(program=>program.id==id);
        setSprints(selectedProgram[0].sprints);
        setActiveSprint(selectedProgram[0]?.sprints[0]?.id);

    }

    const onChangeProgram=async(programId)=>{
        setActiveSprint(null);
        setSprints([]);
        getProgramSprints(programId);

    }
    const validRatingData = () => {
        if (Object.keys(state).length >= 1) {
            const currTraineeData = state[activeTrainee];
            if (currTraineeData &&
                currTraineeData['quality']?.feedback &&
                currTraineeData['quality']?.rate>=0 &&
                currTraineeData['quantity']?.feedback &&
                currTraineeData['quantity']?.rate>=0 &&
                currTraineeData['quantity']?.feedback &&
                currTraineeData['communication']?.feedback &&
                currTraineeData['communication']?.rate>=0 &&
                currTraineeData['communication']?.feedback) {
                return true;
            }
            return false;
        }
        return false;
    }
    return (
        <div className="wrapper">
            <div className="tableHeader">
                <div className='flex'>
                <div className='filters'>
                    <select ref={select} className='select filter-data select-big' onChange={changeTrainee}>
                        {sortedTrainees.map(({ name, id }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                <EngineerFilters onChangeProgram={onChangeProgram} style={{width:'200px'}} filterByCohort={filterByCohort} allEngineers={ratableTrainees} />
                <select onChange={(e)=>setActiveSprint(e.target.value)} className='select filter-data select-big'>
                    {sprints.map((sprint)=><option value={sprint.id} key={sprint.id}>{sprint.name}</option>)}
                </select>
                </div>
            </div>
            <div className="flex-parent" style={{flexDirection:'row'}}>
                {activeTrainee &&
                    <>
                        {rateSpec.map((rate) => (
                            <CategoryElement fieldsData={fieldsData} textbox={textbox} specref={specref} key={rate} category={rate} onFeedback={onFeedback} onChange={onSpecChange} />
                        ))}
                    </>}
            </div>

            <div>
                {
                    validRatingData() && <button onClick={onRate} type="submit" disabled={loading} className="btn rate-btn" >{!loading && <span className='spinner'>Rate</span>} {loading && <span><ImSpinner/></span>}</button>
                }
            </div>
        </div>
    )
}


const CategoryElement = ({ category, onChange, onFeedback, specref, textbox, fieldsData }) => {

    const catname = (category === "communication" ? "Professional Communication" : category);
    return (
        <div className="rate-editor">
            <h5>{catname}</h5>
            <select value={fieldsData[category].spec} ref={specref} id="rate" name={category} required onChange={onChange}>
                <option value="null">Select Rating</option>
                <option value={2}>Very satisfied (2) </option>
                <option value={1}>Satisfied (1)</option>
                <option value={0}>Neutral (0)</option>
            </select>
            <textarea
                rows="5"
                cols="26"
                id="feedback"
                name={category}
                onChange={onFeedback}
                value={fieldsData[category].feedback}
            ></textarea>
        </div>
    );
};


export default withRouter(RateAll);
