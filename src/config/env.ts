import 'dotenv/config';
import EnvTypes from '../types/envType';

const environment: EnvTypes = {
    port: 8080,
    dbConnectionString: process.env.DATABASE_STRING as string,
    jwtSecretKey: process.env.JWT_SECRET as string,
    relyingPartyId: process.env.RELYING_PARTY_ID as string,
    relyingPartyName: process.env.RELYING_PARTY_NAME as string,
    expectedOrigin: process.env.EXPECTED_ORIGIN as string
}

const envConfig = Object.freeze(environment);
export default envConfig;