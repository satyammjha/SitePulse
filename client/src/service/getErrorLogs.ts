import axios from "axios";

/**
 * 
 * @param {string} email
 * @returns {Promise<any>}
 * @throws {Error} 
 */
export const fetchDownTimeLogs = async (email: string): Promise<any> => {
    if (!email) {
        throw new Error("Email is required to fetch downtime logs.");
    }

    console.log(`Fetching downtime logs for email---ts:${email}`);

    try {
        const response = await axios.get(
            `http://localhost:5000/website/getlogs/${email}`
        );

        return response.data;
    } catch (error: any) {
        console.error("Error fetching downtime logs:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Failed to fetch downtime logs");
    }
};