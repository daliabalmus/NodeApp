import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ConnectionRequest from "./ConnectionRequest";
import { getConnectionRequests } from "../../actions/user";

const ConnectionRequests = ({
  // getCurrentProfile,
  getConnectionRequests,
  auth: { user },
  connections,
}) => {
  // profile: {profile, loading}}) => {
  useEffect(() => {
    // getCurrentProfile();
    getConnectionRequests();
  }, []);

  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container my-5">
        <div className="container my-5">
          <h1 className="large text-primary">Your connection requests</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Accept their connection
            requests and you will pe able to see their posts.
          </p>
          {/*<ProfileItem profiles={profiles} />*/}
        </div>

        <div className="my-4">
          <ConnectionRequest connections={connections} />
        </div>
      </section>
    </Fragment>
  );
};

ConnectionRequests.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  getConnectionRequests: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  connections: state.users.connections,
  // connections: state.connections,
  profile: state.profile,
});
export default connect(mapStateToProps, { getConnectionRequests })(
  ConnectionRequests
);
