import {LOBBIES_FETCHED, LOBBIES_LOADING, STOP_LOBBIES_LOADING} from "./types";

const corsProxy = "https://cors-anywhere.herokuapp.com/";

export const fetchLobbies = () => {
    return async (dispatch:Function) => {
        dispatch({
            type: LOBBIES_LOADING,
            payload: null
        });
        const req = await fetch(`${corsProxy}https://aoe2.net/api/lobbies?game=aoe2de`);
        const data = await req.json();

        dispatch({
            type: LOBBIES_FETCHED,
            payload: data
        });
        dispatch({
            type: STOP_LOBBIES_LOADING,
            payload: null
        });
    }
};