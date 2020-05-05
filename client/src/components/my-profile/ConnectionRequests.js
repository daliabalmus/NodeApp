import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ConnectionRequest from './ConnectionRequest'

const ConnectionRequests = ({
        // getCurrentProfile,
        auth: {user},
       }) => {
        // profile: {profile, loading}}) => {
        useEffect(() => {
                // getCurrentProfile();
        }, []);

        console.log(user);

        return user === null ? <Spinner /> : <Fragment>
                <section className="container my-5">



                        <div className="container my-5">
                                <h1 className="large text-primary">Your connection requests</h1>
                                <p className="lead">
                                        <i className="fab fa-connectdevelop"/> Accept their connection requests and you will pe able to see their posts.
                                </p>
                                {/*<ProfileItem profiles={profiles} />*/}
                        </div>

                        <div className="my-4">
                                <ConnectionRequest />
                        </div>
                </section>
        </Fragment>
}

ConnectionRequests.propTypes = {
        getCurrentProfile: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        // profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
        auth: state.auth,
        // profile: state.profile
});
export default connect(mapStateToProps, {})(ConnectionRequests);