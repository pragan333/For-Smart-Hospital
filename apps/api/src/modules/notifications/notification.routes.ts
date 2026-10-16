import { Router, Request, Response } from "express";
import { prisma } from "../../config/db";
import { authenticate } from "../../middleware/auth";

const router = Router();
router.use(authenticate);

// GET /api/notifications
router.get("/", async (req: Request, res: Response) => {
  try {
    const { unreadOnly } = req.query;
    const where: Record<string, unknown> = { recipientId: req.user!.userId };
    if (unreadOnly === "true") where.isRead = false;

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch notifications" });
  }
});

// PATCH /api/notifications/:id/read
router.patch("/:id/read", async (req: Request, res: Response) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to mark notification as read" });
  }
});

// POST /api/notifications/read-all
router.post("/read-all", async (req: Request, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { recipientId: req.user!.userId, isRead: false },
      data: { isRead: true },
    });
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to mark notifications as read" });
  }
});

export default router;
