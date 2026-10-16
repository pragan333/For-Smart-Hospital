import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { env } from "../../config/env";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { LoginSchema, RegisterSchema } from "@smart-hospital/shared-types";

const router = Router();

// POST /api/auth/register
router.post("/register", validate(RegisterSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, error: "Email already registered" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, role },
    });

    res.status(201).json({
      success: true,
      data: { id: user.id, email: user.email, role: user.role },
      message: `User registered. Create a staff profile for ${firstName} ${lastName} separately.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", validate(LoginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });

    res.json({
      success: true,
      data: { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

// POST /api/auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ success: false, error: "Refresh token required" });
      return;
    }

    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string; email: string; role: string };
    const newPayload = { userId: payload.userId, email: payload.email, role: payload.role };
    const accessToken = jwt.sign(newPayload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

    res.json({ success: true, data: { accessToken } });
  } catch {
    res.status(401).json({ success: false, error: "Invalid refresh token" });
  }
});

// GET /api/auth/me
router.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, role: true, createdAt: true },
    });
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
});

export default router;
