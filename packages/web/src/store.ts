import {applyMiddleware, createStore, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";

export default function configureStore(preloadedState:any) {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers: any = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(rootReducer, preloadedState, composedEnhancers);
    return store
}

