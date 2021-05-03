import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/posts";

import { withRouter } from "react-router-dom";
import Post from "./Post";

const Posts = ({ posts: { posts }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="container py-5">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="text-primary mt-5 mb-3">
          <h6 className="mb-0">Say Something...</h6>
        </div>
        <form className="form mb-5" action="">
          <textarea
            className="form-control mb-3"
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          />
          <button type="submit" className="btn btn-primary btn-lg my-1">
            Submit
          </button>
        </form>
      </div>

      <Post posts={posts} />
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, { getPosts })(withRouter(Posts));
