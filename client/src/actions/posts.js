import axios from "axios";
import { POSTS_ERROR, GET_POSTS, UPDATE_LIKES } from "./types";
import { setAlert } from "./alert";
import { getAccessToken } from "./auth";

// GET ALL POSTS
export const getPosts = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/posts/", config);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// LIKE POSTS
export const addLike = (id) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.put(`/api/posts/like/${id}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data,
      },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// UNLIKE POSTS
export const unlikePost = (id) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data,
      },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};
