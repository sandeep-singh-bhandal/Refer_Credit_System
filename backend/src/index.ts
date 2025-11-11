import express, { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import env from "./config/env";
import connectDB from "./config/db";

const app = express();

// Middle Configuration
app.use(express.json());
app.use(cookieParser());

// Connecting to Database
connectDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TS + Express!");
});

app.listen(env.PORT, () =>
  console.log(`Server running on http://localhost:${env.PORT}`)
);
