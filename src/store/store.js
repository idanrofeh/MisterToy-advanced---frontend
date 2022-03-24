import { toyReducer } from "./reducers/toy-reducer";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    toyModule: toyReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));