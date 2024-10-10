// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your API URL


export const fetchLeads = () => {
    const token = localStorage.getItem('auth-token');
    return axios.get(`${API_URL}/leads`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};
export const fetchLeadById = (id) =>{
    const token = localStorage.getItem('auth-token');
    return axios.get(`${API_URL}/leads/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const createLead = (leadData) => {
    const token = localStorage.getItem('auth-token');
    return axios.post(`${API_URL}/leads`,leadData,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // return axios.post(`${API_URL}/leads`, leadData);
};

export const updateLead = (id, leadData) => {
    const token = localStorage.getItem('auth-token');
    return axios.put(`${API_URL}/leads/${id}`, leadData,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteLead = (id) => {
    const token = localStorage.getItem('auth-token');
    return axios.delete(`${API_URL}/leads/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const userLogin = (loginData) =>{
    return axios.post(`${API_URL}/users/login`,loginData)
}
export const createUser = (data) =>{
    return axios.post(`${API_URL}/users/register`,data)
}
