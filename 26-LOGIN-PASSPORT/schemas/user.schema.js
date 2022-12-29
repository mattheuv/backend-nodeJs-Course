const {Schema, model } = require("mongoose")


const User = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})



module.exports  = model('user', User)



