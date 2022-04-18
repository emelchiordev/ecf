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

const coursesSlice = createSlice({
    name: "course",
    initialState: [],
    reducers: {
        setCourse(state, action) {
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

const percentageSlice = createSlice({
    name: 'percentage',
    initialState: [],
    reducers: {
        setPercentage(state, action) {
            return state, action.payload
        }
    }
})

const lessonStatusSlice = createSlice({
    name: 'lessonstatus',
    initialState: [],
    reducers: {
        setLessonStatus(state, action) {
            return state, action.payload
        }
    }
})

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: [],
    reducers: {
        setLesson(state, action) {
            return state, action
        }
    }
})

const rootReducer = combineReducers({
    authenticated: isAuthenticatedSlice.reducer,
    lesson: lessonSlice.reducer,
    course: coursesSlice.reducer,
    student: studentSlice.reducer,
    lessonstatus: lessonStatusSlice.reducer,
    percentage: percentageSlice.reducer

})
const store = configureStore({
    reducer: rootReducer
})

export const { setAuthenticated } = isAuthenticatedSlice.actions
export const { setLesson } = lessonSlice.actions
export const { setPercentage } = percentageSlice.actions
export const { setStudent } = studentSlice.actions
export const { setCourse } = coursesSlice.actions
export const { setLessonStatus } = lessonStatusSlice.actions

export default store