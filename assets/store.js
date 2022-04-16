import { configureStore, createSlice, applyMiddleware, combineReducers } from "@reduxjs/toolkit"

const isAuthenticatedSlice = createSlice({
    name: "authenticated",
    initialState: { status: false, roles: [""], avatar: "", id: '' },
    reducers: {
        setAuthenticated(state, action) {
            return state, action.payload
        }
    }
})

const studentSlice = createSlice({
    name: "student",
    initialState: [],
    reducers: {
        setStudent(state, action) {
            return state, action.payload
        }
    }
})

const rootReducer = combineReducers({
    authenticated: isAuthenticatedSlice.reducer,
    student: studentSlice.reducer

})
const store = configureStore({
    reducer: rootReducer
})

export const { setAuthenticated } = isAuthenticatedSlice.actions
export const { setStudent } = studentSlice.actions

export default store