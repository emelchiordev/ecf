import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"
import moment from 'moment'
import store, { setAuthenticated } from '../store'



function tokenDateIsValid() {
    if (Cookies.get('jwt_hp') !== undefined) {
        const cookiesDecoded = jwt_decode(Cookies.get('jwt_hp'))
        const currentDate = moment().unix()
        console.log(cookiesDecoded)
        if (currentDate < cookiesDecoded.exp) {
            store.dispatch(setAuthenticated({ status: true, roles: cookiesDecoded.roles, avatar: cookiesDecoded.avatar }))
            return true
        } else {
            store.dispatch(setAuthenticated(false))
            return false
        }

    } else {
        store.dispatch(setAuthenticated(false))
        return false
    }
}

function expirateToken() {
    if (Cookies.get('jwt_hp') !== undefined) {
        Cookies.remove('jwt_hp')
        store.dispatch(setAuthenticated(false))
        return false

    } else {
        store.dispatch(setAuthenticated(false))
        return false
    }
}

export default { tokenDateIsValid, expirateToken }