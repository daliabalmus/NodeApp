import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'

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
                                <i className='fas fa-user'/> Welcome {user !== null ? user.name : ""}
                        </p>
                        {profile !== null ? <Fragment><DashboardActions/></Fragment> : <Fragment>
                                <p>You have not setup a profile, please add some info</p>
                                <Link to='/create-profile' className='btn btn-primary my-1'>Create profile</Link>
                        </Fragment>}
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