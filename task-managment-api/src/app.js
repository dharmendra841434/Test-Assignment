import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import TaskRouter from "./routes/tasks.route.js";
import DBConnector from "./database/connections.js";

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

await DBConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/task", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
