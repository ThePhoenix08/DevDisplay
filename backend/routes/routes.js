import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const publicRouter = Router();
publicRouter.get("/", (req, res) => {
  res.status(200).send("API is running.\nCheck /health for more info.");
});

publicRouter.get("/health", (req, res) => {
  const health = {
    status: "OK",
    message: "API is running",
    hostname: req.hostname,
    timestamp: new Date().toISOString(),
    responseTime: process.hrtime(),
    uptime: process.uptime(),
  };

  try {
    res.status(200).json(health);
  } catch (error) {
    health.status = "ERROR";
    health.message = error.message;
    res.status(503).json(health);
  }
});

publicRouter.post("/signup", signUp);

export { publicRouter };