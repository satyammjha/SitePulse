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
    } catch (error: any) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};



export const getWebsiteController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.query;

        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Invalid or missing email parameter" });
        }

        const websites = await prisma.website.findMany({
            where: { user: { email } },
            include: { 
                websiteTicks: { 
                    orderBy: { timestamp: "desc" }, 
                    take: 1 
                } 
            }
        });

        return res.status(200).json(websites);
    } 
    catch (error: any) {
        console.error("Error fetching websites:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
