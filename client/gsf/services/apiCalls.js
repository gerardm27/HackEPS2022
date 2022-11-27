import axios from 'axios';
import {BackendURL} from "../shared/globals";

export async function getListOfAllElements() {
    try {
        const response = await axios({
            method: 'get',
            url: `${BackendURL}/elements`,
        });
        return { list: response.data };
    } catch (error) {
        return { list: null };
    }
}
