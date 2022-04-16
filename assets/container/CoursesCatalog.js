import { connect } from "react-redux"
import CoursesCatalog from "../pages/CoursesCatalog"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const AddCourseCatalogContainer = connect(mapStateToProps, null)(CoursesCatalog)

export default AddCourseCatalogContainer