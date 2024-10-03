const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }    
}, {timestamps: true});

userSchema.pre('save', async function() {
    const user = this;
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(10);

        // create a hashed password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // replace the plain text password with hashed password
        user.password = hashedPassword;
    }
    catch(error) {
        console.log(error);
        throw new Error("Error hashing password");
    }
})

userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }
    catch(error) {
        console.log(error);
        throw new Error("Error comparing password");
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;