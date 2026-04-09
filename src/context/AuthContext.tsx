/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { login as authServiceLogin, logout as authServiceLogout, register as authServiceRegister } from '../services/authService';

export type UserRole = 'student' | 'admin' | null;

interface User {
    name: string;
    role: UserRole;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('campuscare-auth');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Return a reconstructed user object from saved data
                if (parsed.token) {
                    return {
                        name: parsed.name || 'User', // If backend doesn't return name yet
                        role: parsed.role,
                        email: parsed.email || ''
                    };
                }
            } catch {
                console.error("Failed to parse Auth from localStorage.");
            }
        }
        return null;
    });

    const login = async (email: string, password: string) => {
        const response = await authServiceLogin(email, password);
        // response from api has { token, role, userId }
        const newUser: User = { 
            role: response.role as UserRole, 
            email: email, 
            name: "User" // We might want to fetch real name in the future
        };
        setUser(newUser);
        
        // Save to localStorage under exactly this key as requested
        localStorage.setItem('campuscare-auth', JSON.stringify({
            token: response.token,
            role: response.role,
            userId: response.userId,
            email: email,
            name: "User"
        }));
    };

    const register = async (name: string, email: string, password: string) => {
        const response = await authServiceRegister(name, email, password);
        const newUser: User = {
            role: response.role as UserRole,
            email: email,
            name: name
        };
        setUser(newUser);

        localStorage.setItem('campuscare-auth', JSON.stringify({
            token: response.token,
            role: response.role,
            userId: response.userId,
            email: email,
            name: name
        }));
    };

    const logout = () => {
        authServiceLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
