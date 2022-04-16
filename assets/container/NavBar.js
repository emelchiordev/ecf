import { connect } from "react-redux"
import NavBar from "../components/NavBar"
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

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer