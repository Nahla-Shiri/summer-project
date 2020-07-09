import axios from 'axios';

export const apiLogin = (request_data) => {
    if(request_data.userType ==="brand")
        return axios.post('/brand-login', request_data);
    else
    return axios.post('/ambassador-login', request_data); 
    

}

export const getProfile = (userType) => {
    if(userType === "brand")
        return axios.get('/brand-profile');
    else
        return   axios.get('/ambassador-profile');  
}