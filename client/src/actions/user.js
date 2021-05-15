import axios from "axios";
import {
  ACCEPT_INVITATIONS,
  GET_CONNECTIONS,
  GET_INVITATIONS,
  GET_REQUESTS,
  PROFILE_ERROR,
  SEND_REQUEST,
} from "./types";
import { setAlert } from "./alert";
import { getAccessToken } from "./auth";

// SEND CONNECTION REQUEST
export const connectionRequest = (userId) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.put(
      "/api/users/connectionRequest/" + userId,
      config
    );
    dispatch({
      type: SEND_REQUEST,
      payload: res.data,
    });

    dispatch(setAlert("Request sent!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// GET CONNECTION REQUESTS
export const getConnectionRequests = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/users/connectionRequests", config);

    dispatch({
      type: GET_REQUESTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// GET INVITATION REQUESTS
export const getInvitations = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/users/sentInvitations", config);

    dispatch({
      type: GET_INVITATIONS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// ACCEPT CONNECTION REQUEST
export const acceptConnection = (userId) => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    await axios.put("/api/users/acceptConnection/" + userId, config);
    dispatch({
      type: ACCEPT_INVITATIONS,
    });

    dispatch(setAlert("Request accepted!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};

// GET ALL CONNECTIONS
export const getConnections = () => async (dispatch) => {
  const accessToken = await getAccessToken(dispatch);

  const config = {
    headers: {
      "x-auth-token": accessToken,
    },
  };
  try {
    const res = await axios.get("/api/users/connections", config);

    dispatch({
      type: GET_CONNECTIONS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.message,
        status: err.message,
      },
    });
  }
};
