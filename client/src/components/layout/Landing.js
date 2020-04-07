import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
        return(
                <section className="landing">
                        <div className="dark-overlay">
                                <div className="landing-inner">
                                        <h1 className="x-large mb-4 font-weight-semibold">Developer Connector</h1>
                                        <h5 className="text-white mb-5">
                                                Create a developer profile/portfolio, share posts and get help from
                                                other developers
                                        </h5>
                                        <div className="buttons">
                                                <Link to="/register" className="btn btn-green">Sign Up</Link>
                                                <Link to="/login" className="btn btn-light">Login</Link>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}
export default Landing