import bycryptjs from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bycryptjs.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: "Frank",
        email: "frank@gmail.com",
        password: bycryptjs.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: "Joe",
        email: "joe@gmail.com",
        password: bycryptjs.hashSync('123456'),
        isAdmin: true,
    },
]

export default users;