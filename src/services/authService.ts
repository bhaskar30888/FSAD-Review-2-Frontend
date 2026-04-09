import api from './api';
import type { AuthResponse } from '../types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { name, email, password, role: 'student' });
    return response.data;
};

export const logout = async (): Promise<void> => {
    localStorage.removeItem('campuscare-auth');
    // Optional: add backend logout call if required in the future
};
