import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**

 * @param {string} websiteId
 * @param {number} latency 
 */
export const logDownTime = async (websiteId: string, latency: number) => {
    try {
      
        const [lastLog, website] = await Promise.all([
            prisma.downTimeLogs.findFirst({
                where: { websiteId },
                orderBy: { checkedAt: "desc" },
            }),
            prisma.website.findUnique({
                where: { id: websiteId },
                select: { userId: true },
            }),
        ]);

        const now = new Date();

        if (lastLog && new Date(lastLog.checkedAt).getTime() + 30 * 60 * 1000 > now.getTime()) {
            console.log(`⚠️ Downtime log skipped for ${websiteId}, last log was less than 30 minutes ago.`);
            return;
        }

        await prisma.downTimeLogs.create({
            data: {
                websiteId,
                latency,
                checkedAt: now,
                userId: website?.userId || null,
            },
        });

        console.log(`🚨 Downtime logged for ${websiteId}`);
    } catch (error) {
        console.error(`❌ Error logging downtime for ${websiteId}:`, error);
    }
};