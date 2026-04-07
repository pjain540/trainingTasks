//imported express
const express = require('express')
//imported client from postgress
const { Client } = require('pg')

//created an app for express
const app = express()

//created client
const client = new Client({
    host: process.env.DB_HOST,   // IMPORTANT CHANGE
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//connect with client
// Function to retry DB connection
const connectDB = async () => {
    try {
        await client.connect();
        console.log("✅ Connected to PostgreSQL");
    } catch (err) {
        console.log("❌ DB not ready, retrying in 3 sec...");
        setTimeout(connectDB, 3000); // retry after 3 sec
    }
};

// Call connection function
connectDB();

//route to check
app.get('/', async (req, res) => {
    //try block
    try {
        console.log("Hello, from docker!!")
        //made a query
        const result = await client.query("SELECT NOW()");
        //send response
        res.send(result.rows[0].now);
    } catch {
        //inside catch for error
        res.send("DB is not ready!!")
    }
})

//server listen
app.listen(3000, () => console.log("Server is started!!"))


