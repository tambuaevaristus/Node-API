const express = require("express");
const authRoutes = require('./routes/userRoutes')
const tourRoutes = require("./routes/tourRoute");
const appError =require('./utils/appError')
const app = express();


app.use(express.json());
app.use("/api/v1/tours", tourRoutes);

// Catch unhandled Routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    

    next( new AppError(`cant find ${req.originalUrl} on this server`, 404));
})

// handle general errors
app.use((err, req,res, next)=>{
    err.statuCode = err.statusCode || 500;
    error.status = err.status || "error";

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message,
    })
})
// app.use("/api/v1/users", userRouter);

module.exports = app 