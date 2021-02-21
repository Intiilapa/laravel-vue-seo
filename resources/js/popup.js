import VueConfirmDialog from "vue-confirm-dialog";
window.Vue.use(VueConfirmDialog);

let popup = {
    confirm(callback, title = 'Are you sure?', message = '') {
        window.Vue.$confirm(
            {
                // auth: false,
                title: title,
                message: message,
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: confirm => {
                    if (confirm) {
                        callback();
                    }
                }
            },
        )
    },
}

export default popup
