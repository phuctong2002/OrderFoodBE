const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const server = http.Server(app);

const router = require("./router");
const {connect} = require("./db/connect");

app.use(cors());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.raw());
app.use( bodyParser.text({type: "text/html"}));
app.use("/api/v1/", router);

const start = async () => {
  try {
    connect()
        .then( ()=> console.log("Login ket noi vao data roi nhe"))
        .catch( (error)=> console.log(error))
    server.listen(process.env.PORT, () => {
      console.log(`RUNNING IN PORT : ${process.env.PORT}`);
    });
  } catch (err) {}
};


start();


