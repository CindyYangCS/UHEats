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
        res.status(500).json({ error: err })
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    try {
        const result = await prisma.restaurant.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                name: true,
                hours: true
            }
        })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.get("/:id/menu", async (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    try {
        const result = await prisma.restaurant.findUnique({
            where: { id: parsedId },
            select: { id: true, name: true, foodItems: true }
        })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

export default router;