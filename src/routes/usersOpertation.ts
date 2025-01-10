import {Router} from 'express';
import handleNewRegistration from '../controllers/handleNewRegistration'
// ! Create router
const usersOperation = Router();


// ? Register new user
usersOperation.post('/new-registration', handleNewRegistration);



export default usersOperation;