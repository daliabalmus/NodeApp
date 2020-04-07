import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
        return(


                        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                                <Link className="navbar-brand text-white" to="/"><i className="fas fa-code"/> DevConnector</Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto">
                                                <li className="nav-item active">
                                                        <Link to="profiles">Developers</Link>
                                                </li>
                                                <li className="nav-item">
                                                        <Link to="register">Register</Link>
                                                </li>
                                                <li className="nav-item">
                                                        <Link to="login">Login</Link>
                                                </li>

                                        </ul>

                                </div>
                        </nav>



        )
}
export default Navbar