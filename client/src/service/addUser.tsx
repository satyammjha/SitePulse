import axios from 'axios';

const addUser = async (name:string, email: string) => {

    try {
        const response = await axios.post('http://localhost:5000/user/add', {name:name, email: email })
    }
    catch (error: any) {
        return error;
    }
}

export default addUser;