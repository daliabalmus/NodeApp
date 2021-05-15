import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  let displayNavbar = "navbar navbar-expand-lg navbar-light bg-dark ";

  if (window.location.pathname === "/") {
    displayNavbar += "position-fixed";
  } else {
    displayNavbar += "position-relative";
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link to="/dashboard">
          <i className="fas fa-user"></i> Dashboard
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/posts">
          <i className="fas fa-sticky-note" /> Posts
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/my-requests">
          <i className="fas fa-user-plus" /> My requests
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/my-profile">
          <i className="fas fa-id-card"></i> My profile
        </Link>
      </li>
      <li className="nav-item active">
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLiks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link to="profiles">Developers</Link>
      </li>
      <li className="nav-item">
        <Link to="register">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={displayNavbar}>
      <Link className="navbar-brand text-white" to="/">
        <i className="fas fa-code" /> DevConnector
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLiks}</Fragment>
        )}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
