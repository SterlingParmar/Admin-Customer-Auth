import express from "express";
import cors from "cors";
import appRouter from "./routes/index.js";
import { connectToDb } from "./db/index.js";

const port = process.env.PORT || 8080;
const app = express();

const corsOptions = {
  origin: process.env.WEBAPP_BASE_URL, // Replace with your allowed origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1", appRouter);

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port: ", port);
    });
  })
  .catch((error) => {
    console.log("Error: connection to the database :: ", error);
    process.exit(0);
  });
