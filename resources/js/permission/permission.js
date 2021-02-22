import roles from "./roles";
import get from 'lodash.get';

// init data
const userInfo = localStorage.getItem('user')
let userData = false

if (userInfo) {
    userData = JSON.parse(userInfo)
}

// define
let permission = {
    hasRole(resource) {
        if (resource === '') {
            return true;
        }

        if (userData) {
            const userRole = userData.user.role

            if (userRole === 'super_admin') {
                return true;
            }

            const role = get(roles, resource + '.' + userRole)
            return role !== 'undefined' ? role : false;
        }

        return false;
    },
}

export default permission
