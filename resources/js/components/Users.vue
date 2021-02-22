<template>
    <div>
        <div class="row justify-content-center mb-1">
            <div class="col-md-8">
                <h4 class="font-weight-bold float-left">Users: </h4>
                <button v-if="createRole" type="button" class="btn btn-success btn-sm float-right" @click="createUser()">Add</button>
                <create-user-modal :modal-visible="modalVisible" @close="modalVisible = false"></create-user-modal>
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

                    <tr v-for="user in users" scope="row">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>
                            <a v-if="readRole" v-bind:href="'/users/'+ user.id">
                                <button type="button" class="btn btn-success btn-sm">Show</button>
                            </a>
                            <button v-if="updateRole" type="button" class="btn btn-primary btn-sm">Update</button>
                            <button v-if="deleteRole" type="button" @click="deleteUser(user)" class="btn btn-danger btn-sm">Delete
                            </button>
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
import popup from "../popup";
import permission from "../permission/permission";

import CreateUserModal from './user/Create.vue'

export default {
    name: "Users",
    components: {
        CreateUserModal,
    },
    data() {
        return {
            modalVisible: false,
            createRole: permission.hasRole('user.create'),
            readRole: permission.hasRole('user.read'),
            updateRole: permission.hasRole('user.update'),
            deleteRole: permission.hasRole('user.delete'),
        }
    },
    mounted() {
        this.$store.dispatch('fetchUsers')
    },
    methods: {
        createUser() {
            this.modalVisible = true;
        },
        deleteUser(user) {
            popup.confirm(() => {
                this.$store.dispatch('deleteUser', user)
            })
        }
    },
    computed: {
        ...mapGetters([
            'users',
        ])
    }
}
</script>
