const express = require("express");
const authRoutes = require('./routes/userRoutes')
const tourRoutes = require("./routes/tourRoute");
const AppError =require('./utils/appError')
const globalErrorHandler =  require('./controller/errorController')
const app = express();


app.use(express.json());
app.use("/api/v1/tours", tourRoutes);

// Catch unhandled Routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    

    next( new AppError(`cant find ${req.originalUrl} on this server`, 404));
})

// handle general errors
app.use(globalErrorHandler)
// app.use("/api/v1/users", userRouter);

module.exports = app 