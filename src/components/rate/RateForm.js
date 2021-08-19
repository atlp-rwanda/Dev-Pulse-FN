import React from "react";
import "../../styles/ratings.scss";
import PropTypes from "prop-types";
import {ImSpinner} from 'react-icons/im';

const RateForm = ({ onRate, rating, onChange, engineer, loading_ }) => {
	const rateSpec = [
		"quality",
		"quantity",
		"communication"
	];
	return (
		<div className="wrapper">
			<div className="tableHeader">
				<p>{engineer}</p>
			</div>
			<div className="flex-parent">
				{rateSpec.map((rate) => (
					<CategoryElement key={rate} category={rate} onChange={onChange} />
				))}
			</div>
			<div>
				<button type="submit" className="btn rate-btn" onClick={onRate} disabled={loading_}>
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
				<option value={-1}>Unsatisfied (-1) </option>
				<option value={-2}>Very Unsatisfied (-2) </option>
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
