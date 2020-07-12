import axios from 'axios';

export const apiSaveAmbassador = ambassador => {
    return axios.post('/ambassador-register', ambassador);
}

export const apiUpdateAmbassador = ambassador => {
    return axios.put(`/ambassador/${ambassador._id}`, ambassador);
}

export const apiDeleteAmbassador = ambassadorId => {
    return axios.delete(`/ambassador/${ambassadorId}`);
}

export const apiFetchAmbassador = () => {
    return axios.get('/ambassadors');
}