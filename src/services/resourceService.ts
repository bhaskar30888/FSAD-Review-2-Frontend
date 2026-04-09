import api from './api';
import type {} from '../types';

export const getResources = async (): Promise<Resource[]> => {
    const response = await api.get<Resource[]>('/resources');
    return response.data;
};

export const getResourceById = async (id: number): Promise<Resource> => {
    const response = await api.get<Resource>(`/resources/${id}`);
    return response.data;
};

export const createResource = async (data: Omit<Resource, 'id'>): Promise<Resource> => {
    const response = await api.post<Resource>('/resources', data);
    return response.data;
};

export const updateResource = async (id: number, data: Partial<Resource>): Promise<Resource> => {
    const response = await api.put<Resource>(`/resources/${id}`, data);
    return response.data;
};

export const deleteResource = async (id: number): Promise<void> => {
    await api.delete(`/resources/${id}`);
};
