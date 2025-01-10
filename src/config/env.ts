import 'dotenv/config';
import EnvTypes from '../types/envType';

const environment: EnvTypes = {
    port: 8080,
    dbConnectionString: process.env.DATABASE_STRING as string,
    jwtSecretKey: process.env.JWT_SECRET as string
}

const envConfig = Object.freeze(environment);
export default envConfig;