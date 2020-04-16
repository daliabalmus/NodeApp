import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const DashboardActions = props => {
        return(
                <div className="dash-buttons">
                        <Link to="/edit-profile" className="btn btn-outline-primary">
                                <i className="fas fa-user-circle text-primary mr-2"/>Edit Profile
                        </Link>
                        <Link to="/add-experience" className="btn btn-outline-primary">
                                <i className="fab fa-black-tie text-primary mr-2"/> Add Experience
                        </Link>
                        <Link to="/add-education" className="btn btn-outline-primary">
                                <i className="fas fa-graduation-cap text-primary mr-2"/> Add Education
                        </Link>
                </div>
        )
}
DashboardActions.propTypes = {

}
export default DashboardActions;