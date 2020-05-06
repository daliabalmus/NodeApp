import axios from 'axios'
import { POSTS_ERROR, GET_POSTS } from './types'
import { setAlert } from './alert'

// GET ALL POSTS
export const getPosts = () => async dispatch => {
        try {
                const res = await axios.get('/api/posts/');
                dispatch({
                        type: GET_POSTS,
                        payload: res.data
                });

        } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                        type: POSTS_ERROR,
                        payload: {
                                msg: err.message,
                                status: err.message
                        }
                })
        }
}
