import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Post = ({ posts, auth }) => {
  const postItems = posts.map((post) => (
    <div className="post border bg-white p-4 box-shadow mb-4" key={post._id}>
      <div>
        <a href="profile.html">
          <img className="round-img" src={post.avatar} alt="" />
          <h5 className="mt-3 mb-0">{post.name}</h5>
        </a>
      </div>
      <div>
        <p className="mb-2">{post.text}</p>
        <p className="post-date mb-3">
          Posted on{" "}
          <span className="ml-2">
            {<Moment format="YYYY/MM/DD">{post.date}</Moment>}
          </span>
        </p>
        <div className="d-flex align-items-center">
          <div className="pr-4">
            <i className="fas fa-thumbs-up " />
            <span className="ml-2">{post.likes.length}</span>
          </div>
          <div>
            <i className="fas fa-thumbs-down" />
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <Link to="/post">
              <span>View comments</span> ({post.comments.length})
            </Link>
          </div>

          {!auth.loading && post.user === auth.user._id && (
            <div className="text-danger cursor-pointer">Delete this post</div>
          )}
        </div>
      </div>
    </div>
  ));
  return <div className="posts">{postItems}</div>;
};
Post.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Post);
