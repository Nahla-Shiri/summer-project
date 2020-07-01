import axios from 'axios';

export const apiSaveBrand = brand => {
    return axios.post('/brand', brand);
}