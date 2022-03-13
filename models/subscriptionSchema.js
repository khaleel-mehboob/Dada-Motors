const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})

const Subscription = mongoose.model("subscriptions", subscriptionSchema)

module.exports = Subscription;