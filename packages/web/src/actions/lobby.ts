import {LOBBIES_FETCHED, LOBBIES_LOADING, STOP_LOBBIES_LOADING} from "./types";

const corsProxy = async (url:string) => {
    return await fetch(`https://pascalraszyk.de/cors.php`);
};

export const fetchLobbies = () => {
    return async (dispatch:Function) => {
        dispatch({
            type: LOBBIES_LOADING,
            payload: null
        });
        const req = await corsProxy(`https://aoe2.net/api/lobbies?game=aoe2de&qs=${+new Date()}`);
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