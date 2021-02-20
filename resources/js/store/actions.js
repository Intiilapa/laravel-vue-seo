import axios from "axios";
import loader from "../loader";
import Vue from "vue";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.APP_URL;

// loader
axios.interceptors.request.use(config => {
    loader.show();
    return config
})

// success / error interceptor (toast)
axios.interceptors.response.use(
    function (request) {
        loader.hide();
        return request;
    },
    function (error) {
        loader.hide();
        Vue.$toast.error('Something went wrong! (' + error.response.status + ')');
        if (error.response.status === 403) {
            return Promise.reject(error);
        }
    });

let actions = {
    // // createPost({commit}, post) {
    // //     axios.post('/api/posts', post)
    // //         .then(res => {
    // //             commit('CREATE_POST', res.data)
    // //         }).catch(err => {
    // //         console.log(err)
    // //     })
    // //
    // // },
    fetchUsers({commit}) {
        axios.get('/api/users')
            .then(res => {
                commit('FETCH_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    deleteUser({commit}, user) {
        axios.delete(`/api/users/${user.id}`)
            .then(res => {
                if (res.data === 'ok')
                    commit('DELETE_USER', user)
                Vue.$toast.open('Successful operation!');
            }).catch(err => {
            console.log(err)
        })
    }
}

export default actions
