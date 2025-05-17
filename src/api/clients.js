import api from '@/axios';
export const getClient = () => api.get('/clients');
export const createClient = s => api.post('/clients', s);
export const updateClient = s => api.put(`/clients/${s.id}`, s);
export const deleteClient = id => api.delete(`/clients/${id}`);