import express, { type Request, type Response } from "express";
import { authRouter } from "./routes/authRouter";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.listen(3000);
