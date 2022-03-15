import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { searchByName } from '../../actions/search';
import './_style.css';

const SearchForm = ({ placeholder, name, onChange }) => {
  const location = useLocation();
  const paths = ['/profile'];
  const formRef = React.useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const handleInputChange = ({ target }) => {
    onChange(target.value.toLowerCase());
  };
  if (!paths.includes(location.pathname)) {
    return null;
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form-search"><input type="search" placeholder={placeholder} name={name} onChange={handleInputChange} className="search-input" /></form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (search) => dispatch(searchByName(search)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(SearchForm);
