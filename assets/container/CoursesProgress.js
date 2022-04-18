import { connect } from "react-redux"
import CoursesProgress from "../pages/CoursesProgress"
import { setStudent, setCourse, setLessonStatus, setPercentage } from "../store"



const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated,
        studentStore: state.student,
        courseStore: state.course,
        lessonStore: state.lesson
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentToStore: (value) => dispatch(setStudent(value)),
        setCourseToStore: (value) => dispatch(setCourse(value)),
        setLessonToStore: (value) => dispatch(setLessonStatus(value)),
        setPercentageStore: (value) => dispatch(setPercentage(value))
    }
}

const CoursesProgressContainer = connect(mapStateToProps, mapDispatchToProps)(CoursesProgress)

export default CoursesProgressContainer