import api from './api';
import type { User } from '../types';

export const getUser = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export const addUser = async (data: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post<User>('/users', data);
    return response.data;
};
