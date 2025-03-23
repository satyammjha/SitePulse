import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Server } from "socket.io";
import http from "http";
import express from "express";

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

 const checkWebsites = async () => {
    console.log("Checking website uptime...");

    // Fetch websites that haven't been checked in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const websites = await prisma.website.findMany({
        where: {
            OR: [
                { websiteTicks: { none: {} } }, // If no tick exists, check it
                { websiteTicks: { some: { timestamp: { lt: fiveMinutesAgo } } } } // If last check was over 5 min ago
            ]
        },
        include: {
            user: true, // Include user details for WebSocket notifications
        }
    });

    for (const website of websites) {
        const startTime = Date.now();
        let status = "Down";
        let latency = null;

        try {
            await axios.get(website.url, { timeout: 5000 });
            status = "Up";
            latency = Date.now() - startTime;
        } catch (error) {
            latency = null;
        }

        // Save status to DB
        await prisma.websiteTicks.create({
            data: {
                websiteId: website.id,
                status,
                latency: latency || 0,
            },
        });

        // Emit update **only to the owner**
        io.to(website.user.id).emit("website_status_update", {
            websiteId: website.id,
            status,
            latency,
        });
    }
};

setInterval(checkWebsites, 60000);

io.on("connection", (socket: any) => {
    console.log("Frontend connected for real-time updates");
    
    socket.on("join", (userId: string) => {
        console.log(`User ${userId} joined their room`);
        socket.join(userId); // Join user-specific room
    });

    socket.on("disconnect", () => console.log("Frontend disconnected"));
});

export default server;