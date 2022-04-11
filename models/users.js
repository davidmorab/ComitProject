const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function(password){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePasswords = async function(password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}

UserSchema.methods.createJWT =  function(){
    return jwt.sign({
        firstName:this.firstName,
        userId:this._id,
        lastName:this.lastName,
    }, process.env.JWT_SECRET, {expiresIn:'30d'})
}

module.exports = User = mongoose.model("User", UserSchema);