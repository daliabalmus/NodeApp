import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Skills = ({ skills }) => {
  const skill = skills.map((skill) => (
    <div key={skill} className="p-1">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="skills text-primary d-flex justify-content-center">
      {skill}
    </div>
  );
};
Skills.propTypes = {
  skills: PropTypes.array.isRequired,
};

export default connect(null, {})(Skills);
