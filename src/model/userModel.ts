import mongoose, {Schema} from 'mongoose';
import UserTypes from '../types/userType';
const AuthUser = new Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
}, {timestamps: true});

const authUserModel = mongoose.model<UserTypes >(
    'authorized-user',
    AuthUser
);
export default authUserModel;