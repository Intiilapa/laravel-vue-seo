let getters = {
    roles: state => {
        return state.roles
    },
    users: state => {
        return state.users
    },
    user: state => state.user,
    isLogged: state => !!state.user,
}

export default  getters
