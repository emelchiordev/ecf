import { connect } from "react-redux"
import GuardedRoute from "../components/GuardedRoute"

const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const GuardedRouteContainer = connect(mapStateToProps, null)(GuardedRoute)

export default GuardedRouteContainer