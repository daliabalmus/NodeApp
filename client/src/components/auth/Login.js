import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  // redirect is logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="main-container">
        <div className="row no-gutters align-items-center justify-content-center h-100">
          <div className="col-sm-11 col-md-8 col-lg-4">
            <div className="main-form w-100 py-4 px-4">
              <h1 className="large text-uppercase text-primary text-center">
                Login
              </h1>
              <p className="f-13 text-center">
                <i className="fas fa-user" /> Sign into your account
              </p>
              <form
                className="form"
                action="create-profile.html"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="form-group">
                  <label className="mb-3">Your email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-3">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <button type="submit" className="btn btn-block">
                  Login
                </button>
              </form>
              <p className="my-1 mt-4 small text-center">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
