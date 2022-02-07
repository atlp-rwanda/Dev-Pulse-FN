import React, { useEffect,useRef } from "react";
import "../../styles/ratings.scss";
import PropTypes from "prop-types";
import {ImSpinner} from 'react-icons/im';
import { toast } from "react-toastify";
import { withRouter } from "react-router";



const RateForm = ({ onRate, rating, onChange, engineer, loading_, more,traineeRatings,match,edit }) => {
	const [sprint, setSprint] = React.useState(null);
	const [ratingInfo,setRatingInfo] = React.useState({});

	React.useEffect(() => {
		const {ratingId}= match.params;
		const getRatingById=traineeRatings.filter(rating=>rating.id==ratingId);
		if(getRatingById[0]){
			const {sprintId}=getRatingById[0];
			setSprint(sprintId);
			setRatingInfo(getRatingById[0]);
		}
	},[match])
	const handleSetSprint = (e) =>{
		console.log('setting selected',e.target.value);
		setSprint(e.target.value);

	}
	const rateSpec = [
		"quality",
		"quantity",
		"communication"
	];
	console.log('enginerer', engineer,more);
	const specs = {
		cohort: more?.engDetails?.cohortInfo?.name,
		program: more?.engDetails?.programInfo?.name,
		sprints: more?.sprints?.filter((item,idx)=> more?.engDetails?.program === item?.programId),
	}
	const handleRate = (e) =>{
		if(!sprint){
			return toast.error('Please select a sprint');
		}
		onRate(e, sprint);
	}
	console.log('specs', specs);
	return (
		<div className="wrapper">
			<div className="tableHeader">
				<p>{engineer}</p>
			</div>
			<div className="flex-parent">
				<div className="allTogether">
					<span>{specs.cohort}</span>
					<span>{specs.program}</span>
					<select value={sprint} id="rate" name="sprints" onChange={(e)=>handleSetSprint(e)} required>
						<option disabled={edit}  value="null">Select Sprint {sprint}</option>
						{
							specs.sprints.length && specs.sprints.map((item, idx) =>(
								<option value={item.id}>{item.name}</option>
							))
						}
					</select>
				</div>
				<div className="rateCategories">
					{rateSpec.map((rate) => (
						<CategoryElement edit={edit} ratingInfo={ratingInfo} key={rate} category={rate} onChange={onChange} />
					))}
				</div>
			</div>
			<div>
				<button type="submit" className="btns rate-btn" onClick={handleRate} disabled={loading_}>
					{/* {loading && <i className="fa fa-refresh fa-spin"></i>} */}
				{loading_ && <ImSpinner/>}{" "}
					{edit ? 'Update' :'Rate'}
				</button>
				{/* {loading_ && <span>loading...</span>} */}
			</div>
		</div>
	);
};

const CategoryElement = ({ category, onChange, onRate,ratingInfo,edit }) => {

	const catname = (category === "communication" ? "Professional Communication" : category);
	const rateValue = JSON.stringify(ratingInfo[category]?.rate) || null;
	const inputRef = useRef(null);
	const selectRef = useRef(null);

	useEffect(() => {
		if(edit && ratingInfo.id){
			setTimeout(() => {
				inputRef.current.click();
				selectRef.current.click();
			}, 500);
		}
	},[edit,ratingInfo]);


	return (
		<div className="rate-editor">
			<h5>{catname}</h5>
			<select ref={selectRef} id="rate" name={category} onClick={onChange} onChange={onChange} required>
				<option disabled={edit} selected={rateValue==null? true:false} value="null">Select Rating {rateValue}</option>
				<option selected={rateValue==2? true:false}  value={2}>Very satisfied (2) </option>
				<option selected={rateValue==1? true:false} value={1}>Satisfied (1)</option>
				<option selected={rateValue==0? true:false} value={0}>Neutral (0)</option>
			</select>
			<textarea
				ref={inputRef}
				rows="5"
				cols="26"
				id="feedback"
				name={category}
				onChange={onChange}
				onClick={onChange}
				defaultValue={ratingInfo[category]?ratingInfo[category].feedback:''}
			></textarea>
		</div>
	);
};

RateForm.propTypes = {
	rating: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onRate: PropTypes.func.isRequired,
	engineer: PropTypes.string.isRequired,
};

CategoryElement.propTypes = {
	category: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default withRouter(RateForm);
