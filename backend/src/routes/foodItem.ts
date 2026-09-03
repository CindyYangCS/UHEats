import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const result = await prisma.foodItem.findMany({       
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

export default router;