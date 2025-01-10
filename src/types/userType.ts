import {Document} from 'mongoose'

interface UserTypes extends Document {
  username: string;
  email: string;
  password: string;
  privateKey: string,
  passkey: object
}
export default UserTypes;
