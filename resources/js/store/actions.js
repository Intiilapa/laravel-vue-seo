import axios from "axios";
import loader from "../loader";
import Vue from "vue";
import userActions from "./action/userActions";
import dataActions from "./action/dataActions";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.APP_URL;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

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
    ...dataActions,
    ...userActions,
}

export default actions
