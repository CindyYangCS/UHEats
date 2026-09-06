import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await prisma.diningLocation.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        buildingName: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await prisma.diningLocation.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        buildingName: true,
        hours: true,
      },
    });

    if (!result) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug/menu", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await prisma.diningLocation.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true, foodItems: true },
    });

    if (!result) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;