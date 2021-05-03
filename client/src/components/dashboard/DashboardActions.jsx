import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <h5 className="mb-3">Manage your profile</h5>
      <Link to="/edit-profile" className="btn btn-outline-primary mb-3">
        <i className="fas fa-user-circle text-primary mr-2" />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-outline-primary mb-3">
        <i className="fab fa-black-tie text-primary mr-2" /> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-outline-primary mb-3">
        <i className="fas fa-graduation-cap text-primary mr-2" /> Add Education
      </Link>

      <h5 className="mb-3 mt-4">Connections related</h5>
      <Link to={"/user/connections"} className="btn btn-primary mb-3">
        <i className="fas fa-code-branch mr-2" /> View connections
      </Link>
      <Link to="/profiles" className="btn btn-outline-primary mb-3">
        <i className="fas fa-code-branch text-primary mr-2" /> Connect with
        other devs
      </Link>
      <Link to="/sent-invitations" className="btn btn-outline-primary mb-3">
        <i className="fas fa-code-branch text-primary mr-2" /> View sent
        invitiations
      </Link>
    </div>
  );
};
DashboardActions.propTypes = {};
export default DashboardActions;
