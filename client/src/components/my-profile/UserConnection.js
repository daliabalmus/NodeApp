import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Skills from "../profiles/Skills";

const UserConnection = ({ profiles }) => {
  const profile = profiles.map((profile) => (
    <div key={profile._id} className="profile bg-white border box-shadow">
      <img className="round-img" src={profile.user.avatar} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status}</p>
        <p>{profile.location}</p>
        <Link to={"/profile/" + profile.user._id} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <Skills skills={profile.skills} />
    </div>
  ));
  return <div className="profiles">{profile}</div>;
};
UserConnection.propTypes = {
  profiles: PropTypes.array.isRequired,
};
export default connect(null, {})(UserConnection);
