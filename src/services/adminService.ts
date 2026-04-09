import api from './api';
import type {} from '../types';

export const getAnalytics = async (): Promise<AdminAnalyticsSummary> => {
    const response = await api.get<AdminAnalyticsSummary>('/admin/analytics/summary');
    return response.data;
};

export const getReports = async (): Promise<AdminReport[]> => {
    const response = await api.get<AdminReport[]>('/admin/reports');
    return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
