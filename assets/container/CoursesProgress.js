import { connect } from "react-redux"
import CoursesProgress from "../pages/CoursesProgress"
import { setStudent } from "../store"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated,
        studentStore: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentToStore: (value) => dispatch(setStudent(value))
    }
}

const CoursesProgressContainer = connect(mapStateToProps, mapDispatchToProps)(CoursesProgress)

export default CoursesProgressContainer