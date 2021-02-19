const  accessToken  =  localStorage.getItem('access_token')

if (accessToken) {
    axios.defaults.headers.common['Authorization'] =  accessToken
}

let actions = {
    // createPost({commit}, post) {
    //     axios.post('/api/posts', post)
    //         .then(res => {
    //             commit('CREATE_POST', res.data)
    //         }).catch(err => {
    //         console.log(err)
    //     })
    //
    // },
    fetchUsers({commit}) {
        axios.get('/api/users')
            .then(res => {
                commit('FETCH_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    // deletePost({commit}, post) {
    //     axios.delete(`/api/posts/${post.id}`)
    //         .then(res => {
    //             if (res.data === 'ok')
    //                 commit('DELETE_POST', post)
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // }
}

export default actions
