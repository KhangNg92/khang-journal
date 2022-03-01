import { getPostsSaga } from "./saga/getPostsSaga";
import { all, fork } from "@redux-saga/core/effects";
const sagas = [...getPostsSaga]

export const rootSaga = function* () {
    yield all(sagas.map(fork))
}