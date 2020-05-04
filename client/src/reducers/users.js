import { SEND_REQUEST } from '../actions/types'

const initialState = {
        profile: null,
        profiles: [],
        connections: [],
        loading: true,
        error: {}
}

export default function (state = initialState, action) {
        const {type, payload} = action;

        switch (type) {
                case SEND_REQUEST:
                        return {
                                ...state,
                                connections: payload,
                                loading: false
                        };
                default:
                        return state;
        }
}