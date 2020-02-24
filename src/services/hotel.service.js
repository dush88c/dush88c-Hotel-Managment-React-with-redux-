import config from 'config';
import { authHeader, commons } from '../helpers';

export const hotelService = {    
    getAll,
    getById,
    addnew : insert,
    update,
    delete : remove
};

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${config.apiUrl}/hotel/getall`, requestOptions);
    return handleResponse(response);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${config.apiUrl}/hotel/getbyid/${id}`, requestOptions);
    return handleResponse(response);
}

async function insert(hotel) {
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: commons.getFormData(hotel)
    };

    const response = await fetch(`${config.apiUrl}/hotel/addnew`, requestOptions);
    return handleResponse(response);
}

async function update(hotel) {
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: commons.getFormData(hotel)
    };

    const response = await fetch(`${config.apiUrl}/hotel/update`, requestOptions);
    return handleResponse(response);
}

async function remove(hotel) {

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: commons.getFormData(hotel)
    };

    const response = await  fetch(`${config.apiUrl}/hotel/remove`, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.status !== 1) {
            return Promise.reject(data.message);
        }
        return data;
    });
}
