import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () =>
    console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection();
