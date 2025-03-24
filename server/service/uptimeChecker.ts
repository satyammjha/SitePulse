import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { sendUpdate, initSocketServer } from "../socket/socket";


const prisma = new PrismaClient();

/**
 * @returns {Promise<Array>}
 */
const getWebsitesToCheck = async () => {
    const now = new Date();

    const websites = await prisma.website.findMany();
    console.log("all websites", websites);
    return websites.filter((website) =>
        !website.lastCheck || new Date(website.lastCheck.getTime() + website.interval) < now
    );
};

/**
 * Check website uptime
 * @param {string} url
 * @returns {Promise<{status: string, latency: number | null}>}
 */
const checkWebsiteUptime = async (url: string) => {
    const startTime = Date.now();
    try {
        await axios.get(url, { timeout: 5000 });
        return { status: "Up", latency: Date.now() - startTime };
    } catch (error) {
        return { status: "Down", latency: -1 };
    }
};

/**

 * @param {string} websiteId 
 * @param {string} status 
 * @param {number | null} latency 
 * @param {number} interval
 */
const updateWebsiteStatus = async (websiteId: string, status: string, latency: number | null, interval: number) => {
    console.log(`Updating website status for ${websiteId} - Status: ${status}, Latency: ${latency}ms`);

    try {
        await prisma.websiteTicks.create({
            data: {
                websiteId,
                status,
                latency: latency !== null ? latency : -1,
                checkedAt: new Date()
            }
        });

        console.log(`✅ Tick created for ${websiteId}`);

        await prisma.website.update({
            where: { id: websiteId },
            data: { lastCheck: new Date() }
        });

        console.log(`✅ Last check updated for ${websiteId}`);
        sendUpdate({
            websiteId,
            status,
            latency,
            checkedAt: new Date()
        });

    } catch (error) {
        console.error(`❌ Error updating status for ${websiteId}:`, error);
    }
};

export const checkAllWebsites = async () => {
    console.log("Starting website checks...");

    const websites = await getWebsitesToCheck();
    if (websites.length === 0) {
        console.log("No websites to check at the moment.");
        return;
    }

    await Promise.all(
        websites.map(async (website) => {
            const { status, latency } = await checkWebsiteUptime(website.url);
            await updateWebsiteStatus(website.id, status, latency, website.interval);
            console.log(`Checked ${website.url} - Status: ${status}, Latency: ${latency}ms`);
        })
    );

    console.log("Website checks completed.");
};

setInterval(checkAllWebsites, 5000);