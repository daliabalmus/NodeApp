
import axios from 'axios'
import { GET_INVITATIONS, GET_REQUESTS, PROFILE_ERROR, SEND_REQUEST } from './types'
import { setAlert } from './alert'

// SEND CONNECTION REQUEST
export const connectionRequest = (userId) => async dispatch => {
        try {
                const res = await axios.put('/api/users/connectionRequest/' + userId);
                dispatch({
                        type: SEND_REQUEST,
                        payload: res.data
                });

                dispatch(setAlert('Request sent!', 'success'));

        } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                        type: PROFILE_ERROR,
                        payload: {
                                msg: err.message,
                                status: err.message
                        }
                })
        }
}

// GET CONNECTION REQUESTS
export const getConnectionRequests = () => async dispatch =>{
        try {
                const res = await axios.get('/api/users/connectionRequests');

                dispatch({
                        type: GET_REQUESTS,
                        payload: res.data
                });

        } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                        type: PROFILE_ERROR,
                        payload: {
                                msg: err.message,
                                status: err.message
                        }
                })
        }
}

// GET INVITATION REQUESTS
export const getInvitations = () => async dispatch =>{
        try {
                const res = await axios.get('/api/users/sentInvitations');

                dispatch({
                        type: GET_INVITATIONS,
                        payload: res.data
                });

        } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                        type: PROFILE_ERROR,
                        payload: {
                                msg: err.message,
                                status: err.message
                        }
                })
        }
}