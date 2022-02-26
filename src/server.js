import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import  initWebRoutes from "./route/web";
require('dotenv').config();
let app = express();

// config all

 viewEngine(app);
 initWebRoutes(app);

 let port = process.env.PORT || 6969;
 // port === undefined => port = 6969

 app.listen(port,() => {
  console.log(' back en js  port ', + port)
 });