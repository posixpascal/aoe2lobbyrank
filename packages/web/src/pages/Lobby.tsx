import React, {useEffect} from 'react';
import {useRouteMatch} from "react-router";
import {fetchLobbies} from "../actions/lobby";
import {useDispatch, useSelector} from "react-redux";
import {Empty, Spin, Table} from "antd";
import {Container} from "./HomePage";
export const Lobby = () => {
    const match = useRouteMatch();
    const gameID = (match.params as any).id;
    const lobbyStore = useSelector((state: any) => state.lobbies);
    const lobby = lobbyStore.lobbies.find((lobby:any) => lobby.lobby_id === gameID);
    const dispatch = useDispatch();

    // main data fetching loop
    useEffect(() => {
        dispatch(fetchLobbies());
        const interval = setInterval(() => {
            if (lobbyStore.isLoading){
                return;
            }

            dispatch(fetchLobbies());
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    if (!lobby && lobbyStore.isLoading){
        return <Container><Spin /></Container>
    }

    if (!lobby && !lobbyStore.isLoading){
        return <Container><Empty /></Container>;
    }

    const columns : any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text:any) => `${text}`
        },
        {
            title: 'ELO',
            dataIndex: 'rating',
            key: 'rating',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Games',
            dataIndex: 'games',
            key: 'games',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Wins',
            dataIndex: 'wins',
            key: 'wins',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Streak',
            dataIndex: 'streak',
            key: 'streak',
            render: (text:any) => `${text}`,
        }
    ];



    return <Container>
        <h1>{lobby.name}</h1>
        <Table columns={columns} dataSource={lobby.players.filter((player:any) => !!player.name)} />
    </Container>
};