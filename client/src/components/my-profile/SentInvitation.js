import React from "react";
import { Link } from "react-router-dom";

const SentInvitation = ({ sentInvitations }) => {
  const profile = sentInvitations.map((invitation, i) => (
    <div key={invitation._id} className="profile bg-white border box-shadow">
      <img className="round-img" src={invitation.user.avatar} alt="" />

      <div>
        <h2>{invitation.user.name}</h2>
        <p>{invitation.status}</p>
        <p>{invitation.location}</p>
        <Link
          to={"/profile/" + invitation.user._id}
          className="btn btn-outline-primary"
        >
          View Profile
        </Link>
      </div>
      <div className="text-center">
        <Link to="/my-profile" className="btn btn-sm btn-danger">
          Delete invitation
        </Link>
      </div>

      {/*<Skills skills={profile.skills}/>*/}
    </div>
  ));
  return <div className="profiles">{profile}</div>;
};
SentInvitation.propTypes = {};
export default SentInvitation;
