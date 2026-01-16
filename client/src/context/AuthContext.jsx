import React, { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user_data');
        if (token && savedUser) {
            setUser({ ...JSON.parse(savedUser), token });
        } else if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            localStorage.setItem('token', data.token);
            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
                plan: data.plan,
                cnpj: data.cnpj,
                logo_url: data.logo_url,
                phone: data.phone,
                address: data.address
            };
            localStorage.setItem('user_data', JSON.stringify(userData));
            setUser(data);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            localStorage.setItem('token', data.token);
            const userData = { id: data.id, name: data.name, email: data.email, role: data.role, plan: data.plan };
            localStorage.setItem('user_data', JSON.stringify(userData));
            setUser({ ...data, token: data.token });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateUser = (userData) => {
        const currentUser = JSON.parse(localStorage.getItem('user_data') || '{}');
        const newUser = { ...currentUser, ...userData };
        localStorage.setItem('user_data', JSON.stringify(newUser));
        setUser(prev => ({ ...prev, ...userData }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {loading ? (
                <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <Loader />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
