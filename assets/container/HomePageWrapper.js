import { connect } from "react-redux"
import HomePageWrapper from "../pages/HomePageWrapper"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const AddHomePageWrapperContainer = connect(mapStateToProps, null)(HomePageWrapper)

export default AddHomePageWrapperContainer