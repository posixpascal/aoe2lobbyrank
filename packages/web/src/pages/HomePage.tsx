import React, {useEffect, useState} from 'react';
import {Button, Divider, Icon, InputNumber, Table} from "antd";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchLobbies} from "../actions/lobby";

export const Container = styled.div`
   padding: 30px 0;
`;



export const HomePage = () => {
    const match = useRouteMatch();
    const currentGameID = (match.params as any).id;
    const lobbyStore = useSelector((state: any) => state.lobbies);
    const [gameID, setGameID] = useState(currentGameID);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLobbies());
    }, []);

    const columns : any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text:any) => `${text}`
        },
        {
            title: 'Average ELO',
            dataIndex: 'average_rating',
            key: 'average_rating',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Players',
            dataIndex: 'num_players',
            key: 'num_players',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Max players',
            dataIndex: 'num_slots',
            key: 'max_slots',
            render: (text:any) => `${text}`,
        },
        {
            title: 'Server',
            dataIndex: 'server',
            key: 'server',
            render: (text:any) => `${text}`,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text:any, record:any) => (<>
                <Link to={"/lobby/" + record.lobby_id}>View Players</Link>
            </>)
        }
    ];


    return (
        <Container>
            <h2>Enter Game ID</h2>
            <div>
                <InputNumber value={gameID} style={{width: "400px"}} size="large" min={1} onChange={setGameID}/>
            </div>
            <br/>
            <Link to={`/lobby/${gameID}`}><Button type="primary">Next <Icon type="right"/></Button></Link>
            <Divider dashed />
            <h2>All lobbies</h2>
            <Table columns={columns} dataSource={lobbyStore.lobbies} />
        </Container>
    );
}