// Development
const  sendErrorDev = (err, res) =>{
    res.status(err.statuCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
}

// prodution
const  sendErrorProd = (err, res) =>{
    if(err.isOperational){
        res.status(err.statuCode).json({
            status: err.status,
            message: err.message,
          });
    }else {
        res.status(500).json({
            status: "Error",
            message: "Something When wrong"
          });
    }
    
}


module.exports = (err, req, res, next) => {
  err.statuCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
   sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
   sendErrorProd(err, res) 
  }
};
