import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { acceptConnection } from "../../actions/user";

const ConnectionRequest = ({ connections, acceptConnection }) => {
  const acceptInvitation = (id) => {
    acceptConnection(id);
  };
  const profile = connections.map((connection, i) => (
    <div key={connection._id} className="profile bg-white border box-shadow">
      <img className="round-img" src={connection.user.avatar} alt="" />

      <div>
        <h2>{connection.user.name}</h2>
        <p>{connection.status}</p>
        <p>{connection.location}</p>
        <Link
          to={"/profile/" + connection.user._id}
          className="btn btn-outline-primary"
        >
          View Profile
        </Link>
      </div>
      <div className="text-center">
        <div
          className="btn btn-sm btn-primary mb-3"
          onClick={(e) => {
            acceptInvitation(connection.user._id);
          }}
        >
          Accept request
        </div>
        <div className="btn btn-sm btn-dark">Delete request</div>
      </div>

      {/*<Skills skills={profile.skills}/>*/}
    </div>
  ));
  return <div className="profiles">{profile}</div>;
};
ConnectionRequest.propTypes = {};

export default connect(null, { acceptConnection })(ConnectionRequest);
