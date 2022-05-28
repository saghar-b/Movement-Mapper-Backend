const sequelize = require("../config/connection");
const moment = require("moment");
const { User } = require("../models");

const users = [
    {
        user_name:"Saghar",
        email:"behinaeen.saghar@gmail.com",
        password:"123",

    }
  
]



const feedMe = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        });
        
        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()
