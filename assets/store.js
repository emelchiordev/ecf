import { configureStore, createSlice, applyMiddleware, combineReducers } from "@reduxjs/toolkit"

const isAuthenticatedSlice = createSlice({
    name: "authenticated",
    initialState: { status: false, roles: [""] },
    reducers: {
        setAuthenticated(state, action) {
            return state, action.payload
        }
    }
})

const rootReducer = combineReducers({
    authenticated: isAuthenticatedSlice.reducer

})
const store = configureStore({
    reducer: rootReducer
})

export const { setAuthenticated } = isAuthenticatedSlice.actions

export default store