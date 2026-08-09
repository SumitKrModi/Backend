import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { validateRegister } from "../validation/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerUser);

export default authRouter;
