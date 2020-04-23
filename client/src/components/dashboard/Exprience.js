import React, { useEffect, useState } from 'react'
import {Link, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'

const Experience = ({experience}) => {

        console.log(experience);

        const experiences = experience.map(exp => (
                <tr key={exp._id}>
                        <td>{exp.company}</td>
                        <td className="hide-sm">{exp.title}</td>
                        <td className="hide-sm">
                                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {
                                exp.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                        }
                        </td>
                        <td>
                                <button className="btn btn-danger">
                                        Delete
                                </button>
                        </td>
                </tr>
        ));

        return(
                <div className='pt-5'>
                        <h2 className="my-2">Experience Credentials</h2>
                        <table className="table">
                                <thead>
                                <tr>
                                        <th>Company</th>
                                        <th className="hide-sm">Title</th>
                                        <th className="hide-sm">Years</th>
                                        <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                        {experiences}
                                </tbody>
                        </table>
                </div>
        )
}
Experience.propTypes = {
        experience: PropTypes.array.isRequired,
}

export default Experience;