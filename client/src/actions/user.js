
import axios from 'axios'
import { PROFILE_ERROR, SEND_REQUEST } from './types'
import { setAlert } from './alert'

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