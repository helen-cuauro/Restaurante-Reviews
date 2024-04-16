import express from "express";
import jwt from "jsonwebtoken";
import { createUser, validateCredentials } from "../services/user-services";

import { userSchema } from "../models/user";
import { validationHandler } from "../middlewares/validation";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validationHandler(userSchema),
  async (req, res, next) => {
    try {
      const newUser = await createUser(req.body);
      const newData = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      };

      res.status(201).json({
        ok: true,
        message: "usuario creado exitosamente",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);

const jwtSecret = "ultra-secret";
authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await validateCredentials(req.body);
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "5m" });

    res.json({ ok: true, message: "Login exitoso", data: { token } });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
