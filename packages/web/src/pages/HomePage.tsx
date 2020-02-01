import React, {useState} from 'react';
import {Button, Icon, InputNumber} from "antd";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useRouteMatch} from "react-router";

export const Container = styled.div`
   padding: 30px 0;
`;

export const HomePage = () => {
    const match = useRouteMatch();
    const currentGameID = (match.params as any).id;
    const [gameID, setGameID] = useState(currentGameID);
    return (
        <Container>
            <h2>Enter Game ID</h2>
            <div>
                <InputNumber value={gameID} style={{width: "400px"}} size="large" min={1} onChange={setGameID}/>
            </div>
            <br/>
            <Link to={`/lobby/${gameID}`}><Button type="primary">Next <Icon type="right"/></Button></Link>
        </Container>
    );
}