import { connect } from "react-redux"
import AddCoursePage from "../pages/forms/AddCoursePage"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const AddCoursePageContainer = connect(mapStateToProps, null)(AddCoursePage)

export default AddCoursePageContainer