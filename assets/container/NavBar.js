import { connect } from "react-redux"
import NavBar from "../components/NavBar"
import { setStudent } from "../store"
import { setCourse } from "../store"
import { setLesson } from "../store"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated,
        studentStore: state.student,
        courseStore: state.course,
        lessonStatusStore: state.lessonstatus,
        percentageStore: state.percentage,
        lessonStore: state.lesson

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentToStore: (value) => dispatch(setStudent(value)),
        setLessonToStore: (value) => dispatch(setLesson(value))
    }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer