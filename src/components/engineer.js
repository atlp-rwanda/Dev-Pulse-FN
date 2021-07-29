import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.scss';
import '../styles/listTrainee.css'

function btnClasses(btnClass) {
  return `btn btn-smallest ${btnClass}`;
}

function mainClasses(mainClass) {
  return `engineer ${mainClass}`;
}


const Engineer = ({
  value,
  onDelete,
  handleNameClicked,
  engineer,
  btnClass,
  mainClass,

}) => (

  <div className={mainClasses(mainClass)} style={{ width: 400 }}>
    <button onClick={() => onDelete(engineer)} className={btnClasses(btnClass)} type="button">{value}</button>
    <p onClick={() => handleNameClicked(engineer.id)} className="tooltip">
      {engineer.name} {' '} {engineer.email}{' '}
      <span class="tooltiptext">Click for rating the Trainee</span>
    </p>
  </div>
);


Engineer.propTypes = {
  engineer: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  mainClass: PropTypes.string,
};
Engineer.defaultProps = {
  btnClass: '',
  mainClass: '',
};

export default Engineer;
