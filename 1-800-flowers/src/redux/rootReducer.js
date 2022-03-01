import { combineReducers } from "redux";
import postsReducer from './slices/postsSlice'

const rootReducer = combineReducers({
    posts: postsReducer
})

export default rootReducer