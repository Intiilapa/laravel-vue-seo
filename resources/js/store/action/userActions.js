import axios from "axios";

let userActions = {
    login({commit}, credentials) {
        // axios.defaults.withCredentials = false;
        return new Promise((resolve, reject) => {
            axios.post('/api/login', credentials)
                .then(response => {
                    commit('SET_USER_DATA', response.data)
                    window.Vue.$toast.open('Successful operation!')
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },
    fetchRoles({commit}) {
        axios.get('/api/data/roles')
            .then((response) => {
                commit('FETCH_ROLES', response.data)
            }).catch((error) => {
            console.log(error)
        })
    },
    createUser({commit}, user) {
        return new Promise((resolve, reject) => {
            axios.post('/api/users', user)
                .then(response => {
                    commit('CREATE_USER', response.data)
                    window.Vue.$toast.open('Successful operation!')
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },
    updateUser({commit}, user) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/users/${user.id}`, user)
                .then(response => {
                    commit('FETCH_USER', response.data)
                    window.Vue.$toast.open('Successful operation!')
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },
    fetchUser({commit}, userId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/users/${userId}`)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                reject(error)
            })
        });
    },
    fetchUsers({commit}) {
        axios.get('/api/users')
            .then((response) => {
                commit('FETCH_USERS', response.data)
            }).catch((error) => {
            console.log(error)
        })
    },
    deleteUser({commit}, user) {
        axios.delete(`/api/users/${user.id}`)
            .then((response) => {
                commit('DELETE_USER', user)
                window.Vue.$toast.open('Successful operation!');
            }).catch((error) => {
            console.log(error)
        })
    }
}

export default userActions
