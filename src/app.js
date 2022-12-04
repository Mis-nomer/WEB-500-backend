import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import morgan from "morgan";
import cors from "cors";
import habitRouter from "./routes/habit.route";
import userRouter from "./routes/user.route";

const app = express();
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "WEB503 API Doc",
      version: "0.0.1",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: [
    `${__dirname}/routes/*.js", "${__dirname}/controllers/*.js", "${__dirname}/models/*.js`,
  ],
};
const specs = swaggerJSDoc(options);

mongoose
  .connect("mongodb://127.0.0.1:27017/we17201")
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error("Cannot Connect to DB", error));

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api", habitRouter);
app.use("/api", userRouter);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
