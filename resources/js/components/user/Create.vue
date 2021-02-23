<template>
    <div>
        <div id="modal" class="modal fade show" v-show="modalVisible" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit="createUser(user)">
                        <div class="modal-header">
                            <h5 class="text-uppercase">Add New User</h5>
                            <br>
                            <button type="button" @click="$emit('close')" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body p-3">
                            <div class="form-group">
                                <label>Name:</label>
                                <input type="text" placeholder="Name" v-model="user.name" class="form-control" v-bind:class="errors && errors.name ? 'is-invalid' : ''">
                                <span class="invalid-feedback" role="alert" v-if="errors && errors.name">
                                    <strong>{{ errors.name[0] }}</strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label>E-mail:</label>
                                <input type="email" placeholder="E-mail" v-model="user.email" class="form-control" v-bind:class="errors && errors.email ? 'is-invalid' : ''">
                                <span class="invalid-feedback" role="alert" v-if="errors && errors.email">
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" placeholder="Password" v-model="user.password" class="form-control" v-bind:class="errors && errors.password ? 'is-invalid' : ''">
                                <span class="invalid-feedback" role="alert" v-if="errors && errors.password">
                                    <strong>{{ errors.password[0] }}</strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label>Choose a role:</label>
                                <select id="role" v-model="user.role" v-bind:class="errors && errors.role ? 'is-invalid' : ''">
                                    <option v-for="(role, key) in roles" :value="key" :selected="role === user.role">{{ role }}</option>
                                </select>

                                <span class="invalid-feedback" role="alert" v-if="errors && errors.role">
                                    <strong>{{ errors.role[0] }}</strong>
                                </span>
                            </div>
                            <button :disabled="!isValid" class="button-top btn btn-bold btn-block btn-primary" @click.prevent="createUser(user)">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "UserCreateModal",
    props: [
        "modalVisible"
    ],
    data() {
        return {
            newMessage: "",
            errors: {},
            user: {
                name: '',
                email: '',
                password: '',
                role: '',
            }
        }
    },
    mounted() {
        this.$store.dispatch('fetchRoles')
    },
    methods: {
        createUser(user) {
            this.$store.dispatch('createUser', user).then(
                    (response) => {
                        this.$parent.modalVisible = false;
                        this.user.name = '';
                        this.user.email = '';
                        this.user.password = '';
                        this.user.role = '';
                }).catch(
                    (error) => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
            });

        }
    },
    computed: {
        isValid() {
            return this.user.name !== '' && this.user.email !== '' && this.user.password !== '' && this.user.role !== ''
        },
        ...mapGetters([
            'roles'
        ])
    }
}
</script>

<style scoped>
.modal {
    display: block;
    color: black;
    max-width: 100% !important;
}
</style>
