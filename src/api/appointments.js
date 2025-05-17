import api from '@/axios';
export const getAppointments = () => api.get('/appointments');
export const createAppointment = s => api.post('/appointments', s);
export const updateAppointment = s => api.put(`/appointments/${s.id}`, s);
export const deleteAppointment = id => api.delete(`/appointments/${id}`);