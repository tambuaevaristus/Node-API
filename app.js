const express = require("express");
const authRoutes = require('./routes/userRoutes')
const tourRoutes = require("./routes/tourRoute");
const app = express();



app.use(express.json());
app.use("/api/v1/tours", tourRoutes);
// app.use("/api/v1/users", userRouter);

module.exports = app 