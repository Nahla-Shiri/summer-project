import axios from 'axios';

export const apiSaveBrand = brand => {
    return axios.post('/brand', brand);
}

export const apiUpdateBrand = brand => {
    return axios.put(`/brand/${brand._id}`, brand);
}

export const apiDeleteBrand = brandId => {
    return axios.delete(`/brand/${brandId}`);
}

export const apiFetchBrand = () => {
    return axios.get('/brands');
}