import React from "react";
import "../../styles/ratings.scss";
import PropTypes from "prop-types";
import {ImSpinner} from 'react-icons/im';
import { toast } from "react-toastify";


const RateForm = ({ onRate, rating, onChange, engineer, loading_, more }) => {
	const [sprint, setSprint] = React.useState(null);
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
					<select id="rate" name="sprints" onChange={(e)=>handleSetSprint(e)} required>
						<option selected value="null">Select Sprint</option>
						{
							specs.sprints.length && specs.sprints.map((item, idx) =>(
								<option value={item.id}>{item.name}</option>
							))
						}
					</select>
				</div>
				<div className="rateCategories">
					{rateSpec.map((rate) => (
						<CategoryElement key={rate} category={rate} onChange={onChange} />
					))}
				</div>
			</div>
			<div>
				<button type="submit" className="btn rate-btn" onClick={handleRate} disabled={loading_}>
					{/* {loading && <i className="fa fa-refresh fa-spin"></i>} */}
				{loading_ && <ImSpinner/>}{" "}
					Rate
				</button>
				{/* {loading_ && <span>loading...</span>} */}
			</div>
		</div>
	);
};

const CategoryElement = ({ category, onChange, onRate }) => {

	const catname = (category === "communication" ? "Professional Communication" : category);
	return (
		<div className="rate-editor">
			<h5>{catname}</h5>
			<select id="rate" name={category} onChange={onChange} required>
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
				onKeyUp={onChange}
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

export default RateForm;
