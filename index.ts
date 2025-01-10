import connectDb from "./src/config/mongoDb";
import server from './src/server'
import envConfig from './src/config/env'

async function startServer() {
    //! Invoke Database Fn
await connectDb();

   // ! Server Listing 
server.listen(envConfig.port || 5000, () => {
    console.log(`Server is running on port:${envConfig.port}`)
    })
}
// !  Start server
startServer();