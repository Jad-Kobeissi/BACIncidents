import express, { type Request, type Response } from "express";
import { authRouter } from "./routes/authRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import { incidentsRouter } from "./routes/incidentsRouter.js";
import { childRouter } from "./routes/childRouter.js";
import "dotenv/config";

dotenv.config();
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/incidents", incidentsRouter);
app.use("/api/child", childRouter);
app.listen(3000);
