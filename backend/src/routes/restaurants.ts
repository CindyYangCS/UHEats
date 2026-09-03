import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const result = await prisma.restaurant.findMany({
            select: {
                id: true,
                name: true
            }
        })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid restaurant id" });
    }

    try {
        const result = await prisma.restaurant.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                name: true,
                hours: true
            }
        })

        if (!result) {
            return res.status(404).json({ error: "Restaurant not found "})
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});

router.get("/:id/menu", async (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid restaurant id" });
    }

    try {
        const result = await prisma.restaurant.findUnique({
            where: { id: parsedId },
            select: { id: true, name: true, foodItems: true }
        })

        if (!result) {
            return res.status(404).json({ error: "Restaurant menu not found "})
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});

export default router;