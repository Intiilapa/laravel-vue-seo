<template>
<div>
    <form @submit.prevent="login">

        <div class="form-group row">
            <label class="col-md-4 col-form-label text-md-right">E-mail address</label>

            <div class="col-md-6">
                <input type="email" class="form-control" v-bind:class="errors && errors.email ? 'is-invalid' : ''" name="email" v-model="credentials.email" required autocomplete="email" autofocus>
                <span class="invalid-feedback" role="alert" v-if="errors && errors.email">
                    <strong>{{ errors.email[0] }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-4 col-form-label text-md-right">Password</label>

            <div class="col-md-6">
                <input type="password" v-model="credentials.password" class="form-control" v-bind:class="errors && errors.password ? 'is-invalid' : ''" name="password" required autocomplete="current-password">
                <span class="invalid-feedback" role="alert" v-if="errors && errors.password">
                    <strong>{{ errors.password[0] }}</strong>
                </span>
            </div>
        </div>

<!--        <div class="form-group row">-->
<!--            <div class="col-md-6 offset-md-4">-->
<!--                <div class="form-check">-->
<!--                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>-->

<!--                    <label class="form-check-label" for="remember">-->
<!--                        {{ __('Remember Me') }}-->
<!--                    </label>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

        <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-4">
                <button :disabled="!isValid" type="submit" class="btn btn-primary">
                    Login
                </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import Vue from "vue";

export default {
    name: "Login",
    data () {
        return {
            errors: {},
            credentials: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', this.credentials)
                .then(response => {
                    window.location.href = response.data.url;
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors

                        if (this.errors.message) {
                            Vue.$toast.error(this.errors.message[0]);
                        }
                    }
                })
        }
    },
    computed: {
        isValid() {
            return this.credentials.email !== '' && this.credentials.password !== ''
        }
    }
}
</script>

<style scoped>

</style>
