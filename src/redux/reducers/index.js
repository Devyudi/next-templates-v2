import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import theme from './theme.reducers'


const rootReducers = combineReducers({
    theme
})
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.theme) nextState.theme = state.theme // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducers(state, action)
    }
}

export default reducer;