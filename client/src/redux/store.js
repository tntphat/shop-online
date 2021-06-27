import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();
const mdws = [];
mdws.push(sagaMiddleware);
if (process.env.NODE_ENV === "development") mdws.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...mdws));
sagaMiddleware.run(rootSaga);
