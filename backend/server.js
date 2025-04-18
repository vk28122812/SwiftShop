const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const path = require("path");
require("dotenv").config();
// console.log(process.env);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",routes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("Connected to mongodb...");
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    }).catch((error) => {
        console.log(error);
    })