import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("tiny"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

export default app;
