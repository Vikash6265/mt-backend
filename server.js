const express = require("express");
const ConnectDB = require("./config/db_config");
require('dotenv').config()
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5000;

// Connect DB

ConnectDB();


app.use(cors())

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Home Route

app.get("/" , (req , res) =>{
    res.json({
        msg : "WELCOME TO MERN TASK"
    })
})

// User Routes

app.use('/api/user' , require("./routes/userRoutes"))

// Crud Routes

app.use("/api/crud", require("./routes/crudRoutes"))

// Server

app.listen(PORT , () =>{
    console.log(`Server is running at PORT : ${PORT}`);
})