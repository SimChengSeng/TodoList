const mongoose = require('mongoose')

const connectDB = async () => {      
    try{
        const con = await mongoose.connect(
            'mongodb+srv://admin:Pa$$w0rd@cluster0.leqreef.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0',);
        console.log(`MongoDB Connected`);
        } catch (error){
            console.log("Unable to connect to MongoDB")
            console.error(error);
            process.exit(1)
        }
};

module.exports = connectDB;

