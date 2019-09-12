//import library from node_modules
import express from "express";

//import other files in our project
import { prod } from "./startup/prod";
import connectDB from "./startup/db";
import startRoutes from "./startup/routes";

//create app
const app = express();

//connect to DB
connectDB();

//listening on port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));

startRoutes(app);

prod(app);
