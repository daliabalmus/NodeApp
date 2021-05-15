import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return loading && profiles === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container my-5">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead mb-5">
          <i className="fab fa-connectdevelop" /> Browse and connect with
          developers
        </p>
        <ProfileItem profiles={profiles} />
      </div>
    </Fragment>
  );
};
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
