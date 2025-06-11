import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import configReducer from "./config.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
});

export default rootReducer;
