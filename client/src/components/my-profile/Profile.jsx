import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container my-5">
        <Link to="/dashboard" className="btn btn-outline-primary mb-3">
          Back To Dashboard
        </Link>

        <div className="profile-info position-relative">
          <div className="profile-info-box" />
          <div className="profile-info-text">
            <h1 className="large text-white">{user ? user?.name : ""}</h1>
            <p className="lead pt-3">
              {profile.status}, {profile.company}
            </p>
            <p className="lead">{profile.location}</p>
          </div>
          <img className="round-img my-1" src={user.avatar} alt="" />
        </div>

        <div className="my-4">
          <div className="bg-white border p-4 box-shadow text-center mt-4">
            <h3 className="text-primary">{user.name ? user.name : ""}'s Bio</h3>
            <p className="w-75 mx-auto">{profile.bio}</p>
            <div className="line"></div>
            <h3 className="text-primary">Skill Set</h3>
            <Skills skills={profile.skills} />
          </div>

          <div className="row equal">
            <div className="col-md-6 h-100">
              <div className=" border p-4 box-shadow bg-white mt-4 h-100">
                <h3 className="text-primary">Experience</h3>
                <Experience experience={profile.experience} />
              </div>
            </div>
            <div className="col-md-6 h-100">
              <div className="border p-4 box-shadow bg-white mt-4 h-100">
                <h3 className="text-primary">Education</h3>
                <Education education={profile.education} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-primary my-1">
              <i className="fab fa-github" /> Github Repos
            </h2>
            <div className="repo bg-white border p-4 box-shadow my-3 d-flex justify-content-between">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Repo One
                  </a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: 44</li>
                  <li className="badge badge-dark">Watchers: 21</li>
                  <li className="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
            <div className="repo bg-white border p-4 box-shadow my-3 d-flex justify-content-between">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Repo Two
                  </a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: 44</li>
                  <li className="badge badge-dark">Watchers: 21</li>
                  <li className="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
