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
    const lobby = lobbyStore.lobbies.find((lobby: any) => lobby.lobby_id === gameID);
    const dispatch = useDispatch();

    // main data fetching loop
    useEffect(() => {
        dispatch(fetchLobbies());
        const interval = setInterval(() => {
            if (lobbyStore.isLoading) {
                return;
            }

            dispatch(fetchLobbies());
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    if (!lobby && lobbyStore.isLoading) {
        return <Container><Spin/></Container>
    }

    if (!lobby && !lobbyStore.isLoading) {
        return <Container><Empty description={<>
            No lobby was found with GameID#{gameID}.
            <br/>
            This might happen sometimes when AOE2 does not update the lobby database. Please wait a few second or try
            reopening the lobby. Sometimes AOE lobbies are broken, this happens if you choose a server that is too far away from your location.</>}/></Container>;
    }

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => `${text}`,

        },
        {
            title: 'ELO',
            dataIndex: 'rating',
            key: 'rating',
            render: (text: any) => `${text || "-"}`,
            sorter: (a: any, b: any) => a.rating > b.rating ? 1 : (a.rating < b.rating ? -1 : 0),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Games',
            dataIndex: 'games',
            key: 'games',
            render: (text: any) => `${text || "-"}`,
            sorter: (a: any, b: any) => a.games > b.games ? 1 : (a.games < b.games ? -1 : 0),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Wins',
            dataIndex: 'wins',
            key: 'wins',
            render: (text: any) => `${text || "-"}`,
            sorter: (a: any, b: any) => a.wins > b.wins ? 1 : (a.wins < b.wins ? -1 : 0),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Streak',
            dataIndex: 'streak',
            key: 'streak',
            render: (text: any) => `${text || "-"}`,
            sorter: (a: any, b: any) => a.wins > b.wins ? 1 : (a.wins < b.wins ? -1 : 0),
            sortDirections: ['descend', 'ascend'],
        }
    ];


    return <Container>
        <h1>{lobby.name} {lobbyStore.isLoading && <Spin />}</h1>
        <Table columns={columns} pagination={false} dataSource={lobby.players.filter((p: any) => p.profile_id)}/>
    </Container>
};