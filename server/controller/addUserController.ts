import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("addUserController reached");
export const addUserController = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        const user = await prisma.user.create({
            data: { name, email },
        });

        return res.status(201).json({ message: "User added successfully!", user });
    } catch (error: any) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
