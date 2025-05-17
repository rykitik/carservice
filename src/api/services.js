import api from '@/axios';
export const getServices = () => api.get('/services');
export const createService = s => api.post('/services', s);
export const updateService = s => api.put(`/services/${s.id}`, s);
export const deleteService = id => api.delete(`/services/${id}`);