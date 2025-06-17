import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    mobile_number: {
        type: String,
        required: [true, "mobile_number is required!"]
    },
    password: {
        type: String,
        required: [true, "password is required!"]
    },
    is_admin:{
        type:Boolean,
        required: [true, "is_admin: {true or false} is required!"]
    },
    is_active:{
        type:Boolean,
        required: [true, "is_active: {true or false} is required!"]
    }
},
{
    timestamps: true
})

export const User = mongoose.model("users",userSchema);