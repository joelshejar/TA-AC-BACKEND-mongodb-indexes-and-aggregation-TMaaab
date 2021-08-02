var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    name:String,
    username:String,
    email:String,
    address:{
        city:String,
        state:String,
        country:String,
        pin:String
    }
},{timestamps:true})

userSchema.index({username:1,unique:true})

userSchema.index({email:1})



module.exports = mongoose.model('User', userSchema)




