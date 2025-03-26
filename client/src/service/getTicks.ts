import axios from 'axios';
const getWebsiteTicks = async (id: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/website/ticks`, { id });
        return response;
    } catch (error: any) {
        console.error("Error fetching ticks:", error);
        throw error;
    }
};

const calculatePeriodAverage = (data: any[], period: '24h' | '7d') => {
    if (!data.length) return 0;

    const now = Date.now();
    const periodMs = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000
    }[period];

    const filteredData = data.filter(tick => {
        const tickTime = new Date(tick.checkedAt).getTime();
        return now - tickTime <= periodMs;
    });

    if (!filteredData.length) return 0;

    return filteredData.reduce((sum, tick) => sum + tick.latency, 0) / filteredData.length;
};

export { getWebsiteTicks, calculatePeriodAverage };