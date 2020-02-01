import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {PageHeader} from "antd";
import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, HashRouter
} from "react-router-dom";
import {Lobby} from "./pages/Lobby";
import {HomePage} from "./pages/HomePage";
import configureStore from "./store";
import {fetchLobbies} from "./actions/lobby";

export const store = configureStore(undefined);


function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <HashRouter>
                    <Route exact path="/">
                        <PageHeader
                            style={{
                                border: '1px solid rgb(235, 237, 240)',
                            }}
                            title="AOE2 Lobby"
                            subTitle="ELO insights"
                        />
                        <HomePage/>
                    </Route>
                    <Route path="/lobby/:id" component={({match, history}:any) => {
                        return <>
                            <PageHeader
                                style={{
                                    border: '1px solid rgb(235, 237, 240)',
                                }}
                                onBack={() => {
                                    history.goBack()
                                }}
                                title="AOE2 Lobby"
                                subTitle={`#${match.params.id}`}
                            />
                            <Lobby/>
                        </>
                    }}/>
                </HashRouter>
            </div>
        </Provider>
    );
}

export default App;
