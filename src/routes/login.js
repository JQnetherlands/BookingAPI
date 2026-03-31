import "dotenv/config";
import { Router } from "express";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY;
    //   const { username, password } = req.body;
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;

  if (!secretKey) {
    throw new Error("AUTH_SECRET_KEY MISSING");
  }

  if (!reqUsername || !reqPassword) {
    return res.status(400).json({
      message: "Username and password required",
    });
  }
  const user = await prisma.user.findUnique({
    where: { username: reqUsername },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  if (user.username === reqUsername && user.password === reqPassword) {
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ message: "Successfully logged in!", token });
  } else {
      return res.status(401).json({
          message: "Invalid credentials"
      })
  }
});

export default router;
