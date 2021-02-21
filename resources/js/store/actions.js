import axios from "axios";
import loader from "../loader";
import Vue from "vue";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.APP_URL;
// axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

// loader
axios.interceptors.request.use(config => {
    loader.show();
    return config
})

// success / error interceptor (toast)
axios.interceptors.response.use(
    function (request) {
        loader.hide();
        return Promise.resolve(request);
    },
    function (error) {
        loader.hide();
        if (error.response.status !== 422) {
            Vue.$toast.error('Something went wrong! (' + error.response.status + ')');
            // if (error.response.status === 403) {
            //     return Promise.reject(error);
            // }
        }
        return Promise.reject(error);
    });

let actions = {
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
                    Vue.$toast.open('Successful operation!');
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                });
        })
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
                if (response.data === 'ok')
                    commit('DELETE_USER', user)
                Vue.$toast.open('Successful operation!');
            }).catch((error) => {
            console.log(error)
        })
    }
}

export default actions
