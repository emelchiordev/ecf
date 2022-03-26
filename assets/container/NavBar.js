import { connect } from "react-redux"
import NavBar from "../components/NavBar"



const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const NavBarContainer = connect(mapStateToProps, null)(NavBar)

export default NavBarContainer