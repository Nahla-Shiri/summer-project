import axios from 'axios';

export const apiSaveBrand = brand => {
    return axios.post('/brand', brand);
}

export const apiFetchBrand = () => {
    return axios.get('/brand');
}