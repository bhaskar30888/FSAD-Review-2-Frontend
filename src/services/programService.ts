import api from './api';
import type {} from '../types';

export const getPrograms = async (): Promise<Program[]> => {
    const response = await api.get<Program[]>('/programs');
    return response.data;
};

export const getProgramById = async (id: number): Promise<Program> => {
    const response = await api.get<Program>(`/programs/${id}`);
    return response.data;
};

export const createProgram = async (data: Omit<Program, 'id'>): Promise<Program> => {
    const response = await api.post<Program>('/programs', data);
    return response.data;
};

export const updateProgram = async (id: number, data: Partial<Program>): Promise<Program> => {
    const response = await api.put<Program>(`/programs/${id}`, data);
    return response.data;
};

export const deleteProgram = async (id: number): Promise<void> => {
    await api.delete(`/programs/${id}`);
};
