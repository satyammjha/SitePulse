import upTimeChecker from '../service/uptimeChecker';

const checkUptimeController = async (): Promise<void> => {
    try {
        const urls: string[] = [
            "https://www.google.com",
            "https://www.facebook.com",
            "https://www.github.com",
            "https://www.linkedin.com",
            "https://invalid-url.com"
        ];

        const results: Array<{
            url: string;
            userId: string;
            status: string;
            latency: number | null;
            timestamp: string;
            error?: string;
        }> = await Promise.all(urls.map((url, index) => upTimeChecker(url, `user_${index + 1}`)));

        console.log("Results are", results);
    } catch (error: unknown) {
        console.error("Error is", error);
    }
};

export default checkUptimeController;