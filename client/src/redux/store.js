import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
