<template>
    <div>
        <button type="button" class="btn btn-primary btn-sm">Update</button>
        <button type="button" @click="doDelete" class="btn btn-danger btn-sm">Delete</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
    </div>
</template>

<script>

import ConfirmDialogue from './ConfirmDialogue.vue'

export default {
    props: ['user_id'],
    components: {ConfirmDialogue},
    methods: {
        async doDelete() {
            console.log(this.user_id);
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Page',
                message: 'Are you sure you want to delete this page? It cannot be undone.',
                okButton: 'Delete Forever',
            })
            // If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                alert('You have successfully delete this page.')
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
    },
}

</script>

<style scoped>
.delete-btn {
    padding: 0.5em 1em;
    background-color: #eccfc9;
    color: #c5391a;
    border: 2px solid #ea3f1b;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
