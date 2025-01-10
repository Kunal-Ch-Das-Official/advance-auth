import {Document} from 'mongoose'

interface UserTypes extends Document {
  username: string;
  email: string;
  password: string;
}
export default UserTypes;
