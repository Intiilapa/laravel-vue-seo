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
                <table class="table table-bordered table-responsive-lg">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="user in users" scope="row">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <a v-if="readRole" v-bind:href="'/users/'+ user.id">
                                <button type="button" class="btn btn-success btn-sm">Show</button>
                            </a>
                            <button v-if="updateRole" @click="updateUser(user.id)" type="button" class="btn btn-primary btn-sm">Update</button>
                            <button v-if="deleteRole" type="button" @click="deleteUser(user)" class="btn btn-danger btn-sm">Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="!users.length">
                        <td colspan="5">
                            <span>no data found</span>
                        </td>
                    </tr>
                    </tbody>
                    <update-user-modal v-if="updateRole && updateModalVisible" v-bind:user-id-prop="updatedUserId" v-bind:update-modal-visible="updateModalVisible" @close="updateModalVisible = false"></update-user-modal>
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
import UpdateUserModal from "./user/Update.vue";

export default {
    name: "Users",
    components: {
        CreateUserModal,
        UpdateUserModal,
    },
    data() {
        return {
            modalVisible: false,
            updateModalVisible: false,
            updatedUserId: '',
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
        updateUser(userID) {
            this.updateModalVisible = true;
            this.updatedUserId = userID;
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
