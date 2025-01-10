import {Router} from 'express';
import handleNewRegistration from '../controllers/handleNewRegistration'
import handlePasskeyVerification from '../controllers/handlePasskeyVerification';
// ! Create router
const usersOperation = Router();


// ? Register new user
usersOperation.post('/new-registration', handleNewRegistration);
// ? Passkey Varify route
usersOperation.post('/verify-passkey', handlePasskeyVerification);

export default usersOperation;