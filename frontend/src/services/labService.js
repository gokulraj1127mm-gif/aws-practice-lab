import api from './api';

export const getAllLabs = () => api.get('/labs');
export const getLabById = (id) => api.get(`/labs/${id}`);
export const startLab = (id) => api.post(`/labs/${id}/start`);
export const checkLab = (id) => api.post(`/labs/${id}/check`);
