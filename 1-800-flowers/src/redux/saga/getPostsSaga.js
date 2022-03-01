import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { getPostsFailure, getPostsStart, getPostsSuccess } from "../slices/postsSlice";

const watchGetPosts = function* () {
    yield takeEvery(getPostsStart.type, getConfig);
};

const getConfig = function* () {
    try {
        const { data } = yield call(() => axios.get("/posts"));
        yield put(getPostsSuccess(data));
    } catch (error) {
        yield put(getPostsFailure(error));
    }
};

export const getPostsSaga = [watchGetPosts];