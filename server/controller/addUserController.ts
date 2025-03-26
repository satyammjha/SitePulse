import type { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

export const addUserController = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists!", user: existingUser });
        }

        // Create new user if not found
        const newUser = await prisma.user.create({
            data: { name, email },
        });

        return res.status(201).json({ message: "User added successfully!", user: newUser });

    } catch (error: any) {
        console.error("Error adding user:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
