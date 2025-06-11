import Mongoose from 'mongoose'

const connectdb = async () =>{
    try{
        const conn = await Mongoose.connect(process.env.MONGO_URL as string)
    console.log("Successfully Connected to MongoDB : ${conn.connection.host}")
    }
    catch(error:any){
        console.log("Error connecting to MongoDB:", error.message)
        process.exit(1)
    }
}
export default connectdb;