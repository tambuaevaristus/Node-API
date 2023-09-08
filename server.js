const mongoose = require("mongoose");

const app = require('./app');
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://evaristustambua:Evaevaevaeva1997@cluster0.axq7odf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));
