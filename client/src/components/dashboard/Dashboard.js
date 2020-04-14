import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({
        getCurrentProfile,
        auth: {user},
        profile: {profile, loading}}) => {
        useEffect(() => {
                getCurrentProfile();
        }, []);
        console.log(user);
        return loading && profile === null ? <Spinner /> : <Fragment>
                <div className="container pt-5">
                        <h1 className='large text-primary'>
                                Dashoard
                        </h1>
                        <p className='lead'>
                                <i className='fas fa-user'/> Welcome {user.name}
                        </p>
                </div>
        </Fragment>;
}
Dashboard.propTypes = {
        getCurrentProfile: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
        auth: state.auth,
        profile: state.profile
});
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);