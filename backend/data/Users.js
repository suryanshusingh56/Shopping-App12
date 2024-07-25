const bcrypt =require('bcryptjs');
const Users=[
    {
        name:"admin",
        email:"admin@admin.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name:"surya",
        email:"surya@123gmail.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"User",
        email:"user@user.com",
        password:bcrypt.hashSync("123456",10)
    }
];
module.exports=Users;
