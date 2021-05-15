import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getConnections } from "../../actions/user";
import Spinner from "../layout/Spinner";
import UserConnection from "./UserConnection";

const UserConnections = ({
  getConnections,
  userConnections: { userConnections, loading },
}) => {
  useEffect(() => {
    getConnections();
  }, [getConnections]);

  return loading && userConnections === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container my-5">
        <h1 className="large text-primary">My Connections</h1>
        <p className="lead mb-5">
          <i className="fab fa-connectdevelop" /> Browse through your
          connections and find out about their latest posts
        </p>
        <UserConnection profiles={userConnections} />
      </div>
    </Fragment>
  );
};
UserConnections.propTypes = {
  getConnections: PropTypes.func.isRequired,
  userConnections: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
  userConnections: state.users,
});
export default connect(mapStateToProps, { getConnections })(UserConnections);
