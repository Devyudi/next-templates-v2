import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, applyMiddleware, compose } from "redux";
import {  createWrapper } from 'next-redux-wrapper'
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {

    const composeEnhancers =  composeWithDevTools;


    const store = createStore(reducers, preloadedState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept("./reducers/index", () => {
            const nextRootReducer = require("./reducers/index");
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const store = configureStore();


export const wrapper = createWrapper(configureStore,{debug: false})
export default store;

