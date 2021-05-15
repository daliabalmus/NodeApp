import axios from "axios";
import { setAlert } from "./alert";

import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "./types";
import { getAccessToken } from "./auth";

// get current users my-profile
export const getCurrentProfile = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);
  try {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };

    const res = await axios.get("/api/my-profile/me", config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.response.status,
      },
    });
  }
};

// create or update my-profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const accessToken = await getAccessToken(dispatch);
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };
    const res = await axios.post("/api/my-profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// EDIT PROFILE
export const editProfile = (formData, history) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };
    const res = await axios.put("/api/my-profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Profile updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// ADD experience
export const addExperience = (formData, history) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };
    const res = await axios.put("/api/my-profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("experience added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// ADD education
export const addEducation = (formData, history) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };
    const res = await axios.put("/api/my-profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("education added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.delete("/api/my-profile/experience/" + id, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.delete("/api/my-profile/education/" + id, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteAccountAndProfile = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await axios.delete("/api/my-profile/", config);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(
        setAlert("Your account has been permanently deleted", "success")
      );
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/my-profile", config);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// get profile by id
export const getProfileUserId = (id) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/my-profile/user/" + id, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
