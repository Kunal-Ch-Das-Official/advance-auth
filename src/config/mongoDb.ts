import mongoose from 'mongoose';
import envConfig from './env';

const connectDb = async ():Promise<void> => {
try {
    if(!envConfig.dbConnectionString){
        throw new Error(
            "Database connection string is not defined in the environment variables."
          );
    }else{
        mongoose.connection.on("connected", () => {
        console.log("Connection established successfully")
        });

        mongoose.connection.on("error", (err: Error) => {
            console.log({
                error: err,
                message: "Facing error to establishing connection"
            })
        });
    }

    await mongoose.connect(envConfig.dbConnectionString)
} catch (error) {
    console.log("Sorry, we are unable to connect to the database", error);
    process.exit();
}
}
export default connectDb;