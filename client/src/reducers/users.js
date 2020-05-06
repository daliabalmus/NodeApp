import { GET_INVITATIONS, GET_REQUESTS, REQUEST_ERROR, SEND_REQUEST } from '../actions/types'

const initialState = {
        connections: [],
        invitations:[],
        loading: true,
        error: {}
}

export default function (state = initialState, action) {
        const {type, payload} = action;

        switch (type) {
                case SEND_REQUEST:
                case GET_REQUESTS:
                        return {
                                ...state,
                                connections: payload,
                                loading: false
                        };
                case GET_INVITATIONS:
                        return {
                                ...state,
                                invitations: payload,
                                loading: false
                        }
                case REQUEST_ERROR:
                        return {
                                ...state,
                                error: payload,
                                loading: false
                        };
                default:
                        return state;
        }
}