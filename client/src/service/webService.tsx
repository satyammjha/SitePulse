import axios from 'axios';

const addWebsite = async (url: string, email: string, interval: number) => {

    try {
        const response = await axios.post('http://localhost:5000/website/add', { email: email, url: url, interval: interval })
    }
    catch (error: any) {
        return error;
    }
}


const getWebsites = async (email: string) => {
    try {
        const response = await axios.get('http://localhost:5000/website/get', { params: { email: email } })
        return response.data;
    }
    catch (error: any) {
        return error;
    }
}

export {addWebsite, getWebsites};