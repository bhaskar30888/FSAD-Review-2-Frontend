import api from './api';
import type {} from '../types';

export const getGoals = async (): Promise<Goal[]> => {
    const response = await api.get<Goal[]>('/goals');
    return response.data;
};

export const createGoal = async (data: Omit<Goal, 'id'>): Promise<Goal> => {
    const response = await api.post<Goal>('/goals', data);
    return response.data;
};

export const updateGoal = async (id: number, data: Partial<Goal>): Promise<Goal> => {
    const response = await api.put<Goal>(`/goals/${id}`, data);
    return response.data;
};

export const deleteGoal = async (id: number): Promise<void> => {
    await api.delete(`/goals/${id}`);
};
