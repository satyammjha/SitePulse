import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addWebsiteController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { url, email, interval } = req.body;

        if (!url || !email) {
            return res.status(400).json({ error: "URL and email are required." });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const website = await prisma.website.create({
            data: {
                url,
                userId: user.id,
                interval: interval || 300000,
            },
        });

        return res.status(201).json(website);
    } catch (error: any) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export const getWebsiteController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const email = req.query.email as string;
        console.log("Fetching sites for user:", email);

        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Invalid or missing email parameter" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const websites = await prisma.website.findMany({
            where: { userId: user.id },
            include: {
                websiteTicks: {
                    orderBy: { checkedAt: "desc" },
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


export const deleteWebsiteController = async (req: Request, res: Response) => {
    try {
        const { id, email } = req.body;


        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!email) {
            return res.status(400).json({ error: "User email is required" });
        }

        const website = await prisma.website.findUnique({
            where: { id: id },
        });

        if (!website) {
            return res.status(404).json({ error: "Website not found" });
        }


        if (!user || user.email !== email) {
            return res.status(403).json({ error: "Unauthorized: You do not own this website" });
        }

        await prisma.websiteTicks.deleteMany({
            where: { id },
        });

        await prisma.website.delete({
            where: { id: id },
        });

        res.json({ message: "Website and associated ticks deleted successfully" });
    } catch (error) {
        console.error("Error deleting website:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getWebsiteTicksController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Website ID is required" });
        }

        const website = await prisma.website.findUnique({
            where: { id: id },
        });

        if (!website) {
            return res.status(404).json({ error: "Website not found" });
        }

        const websiteTicks = await prisma.websiteTicks.findMany({
            where: { websiteId: id },
            orderBy: { checkedAt: "desc" },
        });

        return res.status(200).json(websiteTicks);

    } catch (error: any) {
        console.error("Error fetching website ticks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};