import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import rateLimit from "express-rate-limit";
import passport from "./config/passport";

import apiRouter from "./api/router";

import authRouter from "./api/routes/auth.route";

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(passport.initialize());

app.use("/api/v1", apiRouter);
app.use("/api/v1/auth", authRouter); // auth

export default app;
