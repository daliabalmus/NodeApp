import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = ({setAlert}) => {
        const [formData, setFormData] = useState({
                name: '',
                email: '',
                password: '',
                password2: ''
        });

        const { name, email, password, password2 } = formData;

        const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

        const onSubmit = async e => {
                e.preventDefault();
                if (password !== password2) {
                        setAlert('Passwords do not match', 'danger', 3000);
                } else {
                        console.log('Success');
                }
        }

        return (
                <Fragment>
                        <div className="main-container ]">
                                <div className="row no-gutters align-items-center justify-content-center h-100">
                                        <div className="col-sm-11 col-md-8 col-lg-4">
                                                <div className="main-form w-100 py-4 px-4">
                                                        <h1 className="large text-primary text-center text-uppercase">Sign Up</h1>
                                                        <p className="f-13 text-center"><i className="fas fa-user"/> Create Your Account</p>
                                                        <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                                                                <div className="form-group">
                                                                        <label className="mb-3">Your name</label>
                                                                        <input className="form-control" type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required/>
                                                                </div>
                                                                <div className="form-group">
                                                                        <label className="mb-3">Your email</label>
                                                                        <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                                                                </div>

                                                                <div className="form-group">
                                                                        <label className="mb-3">Password</label>
                                                                        <input
                                                                                className="form-control"
                                                                                type="password"
                                                                                placeholder="Password"
                                                                                name="password"
                                                                                minLength="6"
                                                                                value={password} onChange={e => onChange(e)} required
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                        <label className="mb-3">Confirm password</label>
                                                                        <input
                                                                                className="form-control"
                                                                                type="password"
                                                                                placeholder="Confirm Password"
                                                                                name="password2"
                                                                                minLength="6"
                                                                                value={password2} onChange={e => onChange(e)} required
                                                                        />
                                                                </div>
                                                                <button type="submit" className="btn btn-block">Register</button>
                                                        </form>
                                                        <p className="my-1 mt-4 text-center">
                                                                Already have an account? <Link to="/login">Sign In</Link>
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </Fragment>
        )

}
Register.propTypes = {
        setAlert: PropTypes.func.isRequired
}
export default connect(null, {setAlert})(Register)