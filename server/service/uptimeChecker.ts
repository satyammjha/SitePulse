const uptimeChecker = async (url: string, userId: string) => {
    try {
        new URL(url);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const startTime = Date.now();
        const response = await fetch(url, { method: "GET", signal: controller.signal });
        clearTimeout(timeout);

        const latency = Date.now() - startTime;
        const status = response.ok ? "UP" : "DOWN";

        return {
            url,
            userId,
            status,
            latency,
            timestamp: new Date().toISOString(),
        };
    } catch (error: any) {
        return {
            url,
            userId,
            status: error.name === "AbortError" ? "UNREACHABLE" : "DOWN",
            latency: null,
            timestamp: new Date().toISOString(),
            error: error.message,
        };
    }
};

export default uptimeChecker;
