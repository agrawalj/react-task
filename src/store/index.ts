import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { getAllUsers, createUser, updateUser, deleteUser, getUser, publishUser } from "../api";
import { call, put, takeEvery } from 'redux-saga/effects'
import { User } from '../types'

function* getAllUsersAction(): Generator {
    const users: any = yield getAllUsers();
    yield put({ type: "USERS_FETCH_SUCCESS", payload: users.data.entries })
}

function* updateUserAction(action: { type: string, payload: any }): Generator {
    const updatedUser: any = yield call(updateUser, action.payload.uid, action.payload.userData)
    yield call(publishUser, action.payload.uid)
    yield put({ type: "USER_UPDATE_SUCCESS", payload: { uid: updatedUser.data.entry.uid, userData: updatedUser.data.entry } })
}

function* createUserAction(action: { type: string, payload: any }): Generator {
    const createdUser: any = yield call(createUser, action.payload.userData)
    yield call(publishUser, createdUser.data.entry.uid)
    yield put({ type: "USER_CREATE_SUCCESS", payload: createdUser.data.entry })
}

function* deleteUserAction(action: { type: string, payload: any }): Generator {
    yield call(deleteUser, action.payload.uid)
    yield put({ type: 'USER_DELETE_SUCCESS', payload: { uid: action.payload.uid } })
}


function* rootSaga() {
    yield takeEvery('USERS_FETCH_REQUEST', getAllUsersAction)
    yield takeEvery('USER_UPDATE_REQUEST', updateUserAction)
    yield takeEvery('USER_CREATE_REQUEST', createUserAction)
    yield takeEvery('USER_DELETE_REQUEST', deleteUserAction)
}

const reducer = (state = {}, action: { type: string, payload: any }) => {
    switch (action.type) {
        case "USERS_FETCH_SUCCESS": {
            const newState = { ...state, users: action.payload }
            return newState;
        }
        case "USER_UPDATE_SUCCESS": {
            let newState: any = { ...state }
            const users = newState.users.map((user: User) => {
                if (user.uid === action.payload.uid) {
                    return action.payload.userData
                }
                return user
            })
            newState.users = users;
            return newState
        }
        case "USER_CREATE_SUCCESS": {
            let newState: any = { ...state }
            newState.users.push(action.payload)
            return newState
        }

        case "USER_DELETE_SUCCESS": {
            let newState: any = { ...state }
            let filteredUsers = newState.users.filter((user: User) => user.uid !== action.payload.uid)
            newState.users = filteredUsers
            return newState
        }
        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)