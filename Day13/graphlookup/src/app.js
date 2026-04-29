const express = require("express");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/report.route");
const watchOwnershipChanges = require("./streams/ownership.stream");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/reports", reportRoutes);

connectDB().then(() => {
    watchOwnershipChanges();
});

app.listen(3000, () => console.log("Server running"));