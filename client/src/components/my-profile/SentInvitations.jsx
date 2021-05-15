import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import { getInvitations } from "../../actions/user";
import SentInvitation from "./SentInvitation";

const SentInvitations = ({ getInvitations, auth: { user }, invitations }) => {
  // profile: {profile, loading}}) => {
  useEffect(() => {
    getInvitations();
  }, []);

  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container my-5">
        <div className="container my-5">
          <h1 className="large text-primary">Your invitations</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> When they accept your
            request you will pe able to see their posts.
          </p>
        </div>

        <div className="my-4">
          <SentInvitation sentInvitations={invitations} />
        </div>
      </section>
    </Fragment>
  );
};

SentInvitations.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getInvitations: PropTypes.func.isRequired,
  invitations: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  invitations: state.users.invitations,
});
export default connect(mapStateToProps, { getInvitations })(SentInvitations);
