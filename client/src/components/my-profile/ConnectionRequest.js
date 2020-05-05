import React from 'react'
import { Link } from 'react-router-dom'


const ConnectionRequest = props => {
        const profile = (
                <div className="profile bg-white border box-shadow">
                        <img
                                className="round-img"
                                src="//www.gravatar.com/avatar/62a7b714be69063433bb53d68d255c5e?s=200&amp;r=pg&amp;d=mm"
                                alt=""
                        />

                                <div>
                                        <h2>profile.user.name</h2>
                                        <p>profile.status</p>
                                        <p>profile.location</p>
                                        <Link to="/my-profile" className="btn btn-outline-primary">View Profile</Link>
                                </div>
                                <div className="text-center">
                                        <Link to="/my-profile" className="btn btn-sm btn-primary mb-3">Accept request</Link>
                                        <Link to="/my-profile" className="btn btn-sm btn-dark">Delete request</Link>
                                </div>



                        {/*<Skills skills={profile.skills}/>*/}
                </div>
        );
        return(
                <div className="profiles">
                        {profile}
                </div>
        )
}
ConnectionRequest.propTypes = {

}
export default ConnectionRequest;