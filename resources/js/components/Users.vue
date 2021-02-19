<template>
    <div>
        <div class="row justify-content-center mb-1">
            <div class="col-md-8">
                <h4 class="font-weight-bold float-left">Users: </h4>
                <button type="button" class="btn btn-success btn-sm float-right">Add</button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <user-table-buttons v-bind:user_id="1"></user-table-buttons>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import UserTableButtons from './UserTableButtons.vue'

export default {
    name: "Users",
    components: {UserTableButtons},
    mounted() {
        this.$store.dispatch('fetchUsers')
    },
    methods: {},
    computed: {
        ...mapGetters([
            'users'
        ])
    }
}
</script>
