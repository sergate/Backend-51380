import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;