import api from './api';
import type {} from '../types';

export const getNutritionLogs = async (): Promise<NutritionLog[]> => {
    const response = await api.get<NutritionLog[]>('/nutrition/logs');
    return response.data;
};

export const addNutritionLog = async (data: Omit<NutritionLog, 'id'>): Promise<NutritionLog> => {
    const response = await api.post<NutritionLog>('/nutrition/logs', data);
    return response.data;
};
