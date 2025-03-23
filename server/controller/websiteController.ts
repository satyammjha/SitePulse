import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addWebsiteController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { url, userId } = req.body;

        if (!url || !userId) {
            return res.status(400).json({ error: "URL and User ID are required." });
        }

        const website = await prisma.website.create({
            data: {
                url,
                userId,
            },
        });

        return res.status(201).json(website);
    } catch (error:any) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
