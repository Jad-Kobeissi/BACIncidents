import express, { type Request, type Response } from "express";
import { authRouter } from "./routes/authRouter";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api", authRouter);
app.listen(3000);
