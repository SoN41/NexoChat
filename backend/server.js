import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5001;
console.log("THIS IS " + process.env.PORT);


app.use(express.json());    // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use('/api/auth' , authRoutes);
app.use('/api/messages' , messageRoutes);
app.use('/api/users' , userRoutes);

app.get('/' , (req ,res) => {
    //root route
    res.send("Hello World! Yo")
})


server.listen(PORT , () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)
});