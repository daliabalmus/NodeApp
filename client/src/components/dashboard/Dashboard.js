import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  deleteAccountAndProfile,
  getCurrentProfile,
} from "../../actions/profile";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Exprience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccountAndProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    (async () => {
      await getCurrentProfile();
    })();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container py-5">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user !== null ? user.name : ""}
        </p>

        {profile !== null ? (
          <Fragment>
            <DashboardActions userId={profile.user._id} />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteAccountAndProfile();
                }}
              >
                <i className="fas fa-user-minus" /> Delete my account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccountAndProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccountAndProfile,
})(Dashboard);
