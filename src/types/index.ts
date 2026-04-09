export interface User {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'admin';
    status?: 'active' | 'inactive';
    joinDate?: string;
}

export interface Journal {
    id: number;
    date: string;
    mood: 'good' | 'neutral' | 'bad' | string;
    content: string;
}

export interface Goal {
    id: number;
    title: string;
    target: number;
    current: number;
    unit: string;
    color?: string;
}

export interface Resource {
    id: number;
    title: string;
    description?: string;
    category: string;
    type: 'video' | 'article' | 'link' | string;
    url: string;
    addedBy?: string;
    dateAdded?: string;
}

export interface Program {
    id: number;
    title: string;
    description: string;
    schedule?: string;
    instructor?: string;
    capacity?: number;
    enrolled?: number;
}

export interface NutritionLog {
    id: number;
    date: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | string;
    calories: number;
    notes?: string;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export interface AuthResponse {
    token: string;
    role: 'student' | 'admin';
    userId: number;
}

export interface AdminAnalyticsSummary {
    totalUsers: number;
    activeUsers: number;
    totalResources: number;
    totalPrograms: number;
    engagementRate?: number;
}

export interface AdminReport {
    id: number;
    type: string;
    generatedAt: string;
    downloadUrl: string;
}
