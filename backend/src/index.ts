import express, { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./config/env";
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import purchaseRouter from "./routes/purchaseRoutes";

const app = express();
const allowedOrigins = ["http://localhost:3000"];

// Middle Configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Connecting to Database
connectDB();

// Api endpoints
app.use("/api/user", userRouter);
app.use("/api/purchase",purchaseRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TS + Express!");
});

app.listen(env.PORT, () =>
  console.log(`Server running on http://localhost:${env.PORT}`)
);
