import React from 'react'
import { Link } from 'react-router-dom'


const ConnectionRequest = ({connections}) => {
        const profile = connections.map((connection, i) => (
                <div key={connection._id} className="profile bg-white border box-shadow">
                        <img
                                className="round-img"
                                src={connection.user.avatar}
                                alt=""
                        />

                                <div>
                                        <h2>{connection.user.name}</h2>
                                        <p>{connection.status}</p>
                                        <p>{connection.location}</p>
                                        <Link to={"/profile/" + connection.user._id} className="btn btn-outline-primary">View Profile</Link>
                                </div>
                                <div className="text-center">
                                        <Link to="/my-profile" className="btn btn-sm btn-primary mb-3">Accept request</Link>
                                        <Link to="/my-profile" className="btn btn-sm btn-dark">Delete request</Link>
                                </div>



                        {/*<Skills skills={profile.skills}/>*/}
                </div>
        ));
        return(
                <div className="profiles">
                        {profile}
                </div>
        )
}
ConnectionRequest.propTypes = {

}
export default ConnectionRequest;