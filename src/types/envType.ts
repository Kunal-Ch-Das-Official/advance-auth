interface EnvTypes {
port: number,
dbConnectionString: string,
jwtSecretKey: string,
relyingPartyId: string,
relyingPartyName: string,
expectedOrigin: string
}

export default EnvTypes;