const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/postsRoute");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const port = process.env.port|| 3001
const uri = process.env.DBURI
mongoose.set("strictQuery", true);


  
mongoose.connect(uri, (e) => {
  if(e){console.log("DataBase Error :",e)}
  else{console.log("Connected to DB");}
});
const app = express();
app.use(cors());
// using cors below
router.use(function (req, res, next) {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: PUT,PATCH,GET,POST,DELETE,OPTIONS");
  header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use("/public", express.static("public"));
app.use("/user/api/v1/", router);
app.get("*", (req, res) => {
  res.status(404).json({ status: "404 !! Page Not Found" });
});
app.listen(port, (e) => {
  console.log(`Server is connected at port ${port}`);
});
