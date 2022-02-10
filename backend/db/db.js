import mongoose from "mongoose";

const dbConnection = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection with MongoDB: OK");
    } catch (e) {
        console.log("Error coneccting to MongoDB: \n", e);
    }
};
export default {dbConnection}