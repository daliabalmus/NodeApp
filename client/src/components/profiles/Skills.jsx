import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Skills = ({ skills }) => {
  const skill = skills.map((skill) => (
    <li key={skill} className="text-primary">
      <i className="fas fa-check"></i> {skill}
    </li>
  ));

  return <ul>{skill}</ul>;
};
Skills.propTypes = {
  skills: PropTypes.array.isRequired,
};

export default connect(null, {})(Skills);
