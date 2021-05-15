import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileUserId } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import { connectionRequest } from "../../actions/user";

const UserProfile = ({
  getProfileUserId,
  connectionRequest,
  // auth: {user},
  match,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileUserId(match.params.id);
  }, [getProfileUserId]);

  // const user = profile.user;
  const sendConnection = (userId) => {
    connectionRequest(userId);
  };
  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container my-5">
            <Link to="/profiles" className="btn btn-outline-primary mb-3">
              Back To Profiles
            </Link>
            <div className="profile-info position-relative">
              <div
                className="btn-primary btn connect-user-button px-5"
                onClick={(e) => {
                  sendConnection(profile.user._id);
                }}
              >
                Connect
              </div>
              <div className="profile-info-box"></div>
              <div className="profile-info-text">
                <h1 className="large text-white">{profile.user.name}</h1>
                <p className="lead pt-3">
                  {profile.status}, {profile.company}
                </p>
                <p className="lead">{profile.location}</p>

                {/*<div className="icons my-1">*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fas fa-globe fa-2x"></i>*/}
                {/*        </a>*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fab fa-twitter fa-2x"></i>*/}
                {/*        </a>*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fab fa-facebook fa-2x"></i>*/}
                {/*        </a>*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fab fa-linkedin fa-2x"></i>*/}
                {/*        </a>*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fab fa-youtube fa-2x"></i>*/}
                {/*        </a>*/}
                {/*        <a href="#" target="_blank" rel="noopener noreferrer">*/}
                {/*                <i className="fab fa-instagram fa-2x"></i>*/}
                {/*        </a>*/}
                {/*</div>*/}
              </div>
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
            </div>

            <div className="my-4">
              <div className="bg-white border p-4 box-shadow text-center mt-4">
                <h3 className="text-primary">
                  {profile.user.name ? profile.user.name : ""}'s Bio
                </h3>
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
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getProfileUserId: PropTypes.func.isRequired,
  connectionRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getProfileUserId,
  connectionRequest,
})(UserProfile);
