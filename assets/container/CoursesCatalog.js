import { connect } from "react-redux"
import CoursesCatalog from "../pages/CoursesCatalog"
import { setLesson } from "../store"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLessonToStore: (value) => dispatch(setLesson(value))
    }
}

const AddCourseCatalogContainer = connect(mapStateToProps, mapDispatchToProps)(CoursesCatalog)

export default AddCourseCatalogContainer