const express = require("express");
const tourRoutes = require("./routes/tourRoute");
const userRoutes = require("./routes/userRoutes");
const AppError =require('./utils/appError')
const globalErrorHandler =  require('./controller/errorController')
const app = express();


app.use(express.json());
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Header =mm==>",req.headers)

  next();
})

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);
module.exports = app 