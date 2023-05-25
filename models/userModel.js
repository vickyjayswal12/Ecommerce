import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  // for white space remove
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
        //0=user, 1=admin
    }

},
    { timestamp: true }   //timestamp use for store inter data time
)

//this is for create model
export default mongoose.model('users', userSchema);