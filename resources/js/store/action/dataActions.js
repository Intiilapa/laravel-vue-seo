import axios from "axios";

let dataActions = {
    fetchRoles({commit}) {
        axios.get('/api/data/roles')
            .then((response) => {
                commit('FETCH_ROLES', response.data)
            }).catch((error) => {
            console.log(error)
        })
    },
}

export default dataActions
