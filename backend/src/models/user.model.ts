import mongoose from 'mongoose';

const SchemaUser = new mongoose.Schema({
    email : {type: "string", required:[true, "Email is required"], unique: true},
    password : {type: "string", required:[true, "Password is required"]}
});

export const User = mongoose.model("user", SchemaUser);

