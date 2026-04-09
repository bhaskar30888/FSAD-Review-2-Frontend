import api from './api';
import type {} from '../types';

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
};

export const markAsRead = async (id: number): Promise<Notification> => {
    const response = await api.put<Notification>(`/notifications/${id}/read`);
    return response.data;
};
