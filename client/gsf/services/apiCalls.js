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
    console.log(id)
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

export async function postCreateNewReport(tipus,coords,description,status,_image) {
    try {
        console.log("tipus: " + tipus);
        console.log("description: " + description);
        console.log("status: " + status);
        console.log(coords);
        console.log("image: " + _image);
        const tempbody = {
            type: tipus,
            coord: coords,
            desc: description,
            status: status,
            image: _image
        }
        console.log(tempbody);
        const response = await axios({
            method: 'post',
            url: `${BackendURL}/elements`,
            data: tempbody
        });
        return { status: response.status };
    } catch (error) {
        return { status: error };
    }
}

export async function deleteElement(id) {
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

export async function putEditStatusReport(id, status) {
    try {
        const response = await axios({
            method: 'put',
            url: `${BackendURL}/elements/${id}`,
            data: {
                status: status
            }
        });
        return { status: response.status };
    } catch (error) {
        return { status: error };
    }
}
