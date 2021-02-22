// resource -> crud -> role by role
// SA => *
let roles = {
    user : {
        list: {
            admin: true,
            user: true,
        },
        read: {
            admin: true,
            user: true,
        },
        create: {
            admin: true,
            user: false,
        },
        update: {
            admin: false,
            user: false,
        },
        delete: {
            admin: true,
            user: false,
        },
    },
    blog: {},
}

export default roles
