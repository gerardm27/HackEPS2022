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
        return { status: response.status };
    }
}
