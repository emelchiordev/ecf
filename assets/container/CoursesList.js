import { connect } from "react-redux"
import CoursesList from "../pages/CoursesList"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const AddCourseListContainer = connect(mapStateToProps, null)(CoursesList)

export default AddCourseListContainer