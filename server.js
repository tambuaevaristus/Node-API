const mongoose = require("mongoose");
const port = 8000;



mongoose.set("strictQuery", false);
const app = require('./app');
mongoose
.connect(
  "mongodb+srv://evaristustambua:Evaevaevaeva1997@cluster0.axq7odf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
