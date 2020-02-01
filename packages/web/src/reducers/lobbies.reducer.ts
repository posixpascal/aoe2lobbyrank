import {LOBBIES_FETCHED, LOBBIES_LOADING, STOP_LOBBIES_LOADING} from "../actions/types";

const initialState = {
    lobbies: [],
    isLoading: false
};

export default function(state = initialState,  action:any) {
    switch (action.type) {
        case LOBBIES_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOBBIES_FETCHED:
            return {
                ...state,
                lobbies: action.payload
            };
        case STOP_LOBBIES_LOADING:
            return {
                ...state,
                isLoading: false
            }
    }
    return state;
}
