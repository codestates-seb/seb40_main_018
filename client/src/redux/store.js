import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";

// window 타입 정의
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
