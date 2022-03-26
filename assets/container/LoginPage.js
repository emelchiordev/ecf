import { connect } from "react-redux"
import { setAuthenticated } from "../store"
import Loginpage from "../pages/Loginpage"



const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticatedFromStore: (value) => { dispatch(setAuthenticated(value)) }
    }
}
const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(Loginpage)

export default LoginPageContainer