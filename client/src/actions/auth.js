import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import jwt_decode from "jwt-decode";

export const handleRefreshToken = async (refreshToken, dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ token: refreshToken });

  try {
    const res = await axios.post("/api/auth/refreshAccessToken", body, config);

    localStorage.setItem("token", res.data.accessToken);

    // if (res) {
    return res.data.accessToken;
    // }
  } catch (err) {
    localStorage.removeItem("refreshToken");
    // dispatch({
    //   type: AUTH_ERROR,
    // });
  }
};

export const getAccessToken = async (dispatch) => {
  let accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  const decoded = jwt_decode(accessToken);
  const { exp } = decoded;

  if (exp < (new Date().getTime() + 1) / 1000) {
    // token is expired
    accessToken = await handleRefreshToken(refreshToken, dispatch);
    return accessToken;
  } else {
    // token is still valid
    console.log("token is not expired");
    return accessToken;
  }
};

//  Load user => protect
export const loadUser = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    };
    const res = await axios.get("/api/auth", config);

    if (res) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout / clear my-profile

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
