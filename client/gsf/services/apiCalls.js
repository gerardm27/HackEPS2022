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

export async function getElementInformation(id) {
    try {
        const response = await axios({
            method: 'get',
            url: `${BackendURL}/elements/${id}`,
        });
        return { list: response.data };
    } catch (error) {
        return { list: null };
    }
}

export async function postCreateNewReport(tipus, description, status, coords) {
    try {
        const response = await axios({
            method: 'post',
            url: `${BackendURL}/elements`,
            body: {
                type: tipus,
                coord: coords,
                desc: description,
                status : status
            }
        });
        return { status: response.status };
    } catch (error) {
        return { status: error };
    }
}

export async function deleteElement(id) {
    console.log(id);
    try {
        const response = await axios({
            method: 'delete',
            url: `${BackendURL}/elements/${id}`
        });
        return { status: response.status };
    } catch (error) {
        return { status: error };
    }
}
