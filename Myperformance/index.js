import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DBconnection/dbConnection.js";
import userRoute from "./Routers/userRoute.js";
import jobuser from "./Routers/jobRoute.js";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();
let app = express(); // for creating instance
let port = process.env.PORT;
connectDB(process.env.DBSTRING, process.env.DBNAME);

//swagger api config
let options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Job Portal Application',
      description: 'Node Expressjs Job Portal Application',
    },
    servers: [
      {
        url: "http://localhost:2000",
      },
    ],
  },
  apis: ['./Routers/*.js'], // Adjust path if needed to match your routes
};

let spec = swaggerJSDoc(options);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Use built-in Express middleware instead of body-parser
app.use(helmet()); // Uncomment this line if you want to use Helmet for security
app.use(xss()); // Uncomment this line if you want to use xss-clean for XSS protection
app.use(ExpressMongoSanitize());
app.use("/user", userRoute);
app.use("/job", jobuser);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec)); // Corrected: 'swaggerUi.serve' to 'swaggerUi.serve'

app.listen(port, () => {
  console.log(`Hello Developer, Server is started at port Number http://localhost:${port}`);
});
