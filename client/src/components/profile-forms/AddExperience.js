import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className="container mt-5">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="* Job Title"
            value={title}
            name="title"
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="* Company"
            value={company}
            name="company"
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Location"
            value={location}
            name="location"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            className="form-control"
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        {!toDateDisabled && (
          <div className="form-group">
            <h4>To Date</h4>
            <input
              className="form-control"
              type="date"
              value={to}
              name="to"
              onChange={(e) => onChange(e)}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            className="form-control"
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary px-5">
          Submit
        </button>
        <Link className="btn btn-outline-primary px-5" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(AddExperience);
