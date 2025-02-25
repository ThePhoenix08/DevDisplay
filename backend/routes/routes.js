import { Router } from 'express';
import { loginUser, logoutUser, refreshUser, registerUser } from '../controllers/auth.controller.js';
import authenticate from '../middlewares/auth.middleware.js';

const publicRouter = Router();
publicRouter.get("/", (_req, res) => {
  res.status(200).send("API is running.\nCheck /health for more info.");
});

publicRouter.get("/healthCheck", (req, res) => {
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

publicRouter.post(`/api/register`, registerUser);
publicRouter.post(`/api/login`, loginUser);

const protectedRouter = Router();
protectedRouter.use(authenticate);
protectedRouter.post(`/logout`, logoutUser);
protectedRouter.post(`/refresh`, refreshUser);

export { publicRouter, protectedRouter };
