import api from './api';
import type {} from '../types';

export const getJournals = async (): Promise<Journal[]> => {
    const response = await api.get<Journal[]>('/journal');
    return response.data;
};

export const createJournal = async (data: Omit<Journal, 'id'>): Promise<Journal> => {
    const response = await api.post<Journal>('/journal', data);
    return response.data;
};

export const updateJournal = async (id: number, data: Partial<Journal>): Promise<Journal> => {
    const response = await api.put<Journal>(`/journal/${id}`, data);
    return response.data;
};

export const deleteJournal = async (id: number): Promise<void> => {
    await api.delete(`/journal/${id}`);
};
