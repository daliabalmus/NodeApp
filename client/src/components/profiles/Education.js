import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const Education = ({ education }) => {
  const educations = education.map((educ, i) => (
    <div key={educ._id} className="mb-3 mt-4">
      <h5 className="font-weight-bold text-dark">{educ.school}</h5>
      <p className="mb-2">
        <Moment format="YYYY/MM/DD">{educ.from}</Moment> -{" "}
        {educ.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{educ.to}</Moment>
        )}
      </p>
      <p className="mb-2">
        <strong>Degree: </strong>
        {educ.degree}
      </p>
      <p className="mb-2">
        <strong>Field of study: </strong>
        {educ.fieldofstudy}
      </p>
      <p className="mb-2">
        <strong>Description: </strong>
        {educ.description}
      </p>

      {i < education.length - 1 ? <div className="line" /> : ""}
    </div>
  ));

  return <div>{educations}</div>;
};
Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default connect(null, {})(Education);
