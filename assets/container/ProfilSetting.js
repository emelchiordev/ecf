import { connect } from "react-redux"
import ProfilSetting from "../pages/ProfilSetting"



const mapStateToProps = state => {
    return {
        isAuthenticatedStatus: state.authenticated
    }
}

const ProfilSettingContainer = connect(mapStateToProps, null)(ProfilSetting)

export default ProfilSettingContainer