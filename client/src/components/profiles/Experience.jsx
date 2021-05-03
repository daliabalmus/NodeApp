import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp, i) => (
    <div key={exp._id} className="mb-3 mt-4">
      <h5 className="font-weight-bold text-dark">{exp.company}</h5>
      <p className="mb-2">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p className="mb-2">
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p className="mb-2">
        <strong>Description: </strong>
        {exp.description}
      </p>

      {i < experience.length - 1 ? <div className="line" /> : ""}
    </div>
  ));

  return <div>{experiences}</div>;
};
Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null, {})(Experience);
