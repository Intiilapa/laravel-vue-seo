let mutations = {
    SET_USER_DATA(state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },
    FETCH_ROLES(state, roles) {
        return state.roles = roles
    },
    CREATE_USER(state, user) {
        state.users.unshift(user)
    },
    FETCH_USERS(state, users) {
        return state.users = users
    },
    DELETE_USER(state, user) {
        let index = state.users.findIndex(item => item.id === user.id)
        state.users.splice(index, 1)
    }
}

export default mutations
