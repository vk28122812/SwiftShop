const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",routes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
// app.use("/",express.static(path.join(__dirname, 'dist')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist','index.html'));
//   });
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