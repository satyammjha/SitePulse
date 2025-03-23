import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

/**
 * 
 * @returns {Promise<Array>}
 */
const getWebsitesToCheck = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 0.2 * 60 * 1000);
    
    return await prisma.website.findMany({
        where: {
            OR: [
                { lastCheck: undefined },
                { lastCheck: { lt: fiveMinutesAgo } }
            ]
        }
    });
};

/**
 * Check the uptime of a website
 * @param {string} url
 * @returns {Promise<{status: string, latency: number | null}>}
 */
const checkWebsiteUptime = async (url:string) => {
    const startTime = Date.now();
    try {
        await axios.get(url, { timeout: 5000 });
        return { status: "Up", latency: Date.now() - startTime };
    } catch (error) {
        return { status: "Down", latency: null };
    }
};

/**
 * Update website tick data in the database
 * @param {string} websiteId 
 * @param {string} status 
 * @param {number | null} latency 
 */
const updateWebsiteStatus = async (websiteId: string, status: string, latency: number | null) => {
    await prisma.websiteTicks.create({
        data: {
            websiteId,
            status,
            latency: latency || 0
        }
    });

    await prisma.website.update({
        where: { id: websiteId },
        data: { lastCheck: new Date() }
    });
};
export const checkAllWebsites = async () => {
    console.log("Starting website checks...");
    
    const websites = await getWebsitesToCheck();
    if (websites.length === 0) {
        console.log("No websites to check at the moment.");
        return;
    }

    for (const website of websites) {
        const { status, latency } = await checkWebsiteUptime(website.url);
        await updateWebsiteStatus(website.id, status, latency);
        console.log(`Checked ${website.url} - Status: ${status}, Latency: ${latency}ms`);
    }

    console.log("Website checks completed.");
};