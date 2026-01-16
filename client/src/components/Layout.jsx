import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Calendar, DollarSign, Menu, X, Star, Sun, Moon, LogOut, Plug, ShoppingBag, Settings, Users } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Estoque', href: '/dashboard/inventory', icon: Package },
        { name: 'Vendas', href: '/dashboard/sales', icon: ShoppingCart },
        { name: 'Agenda', href: '/dashboard/appointments', icon: Calendar },
        { name: 'Financeiro', href: '/dashboard/finances', icon: DollarSign },
        { name: 'Planos & Assinatura', href: '/dashboard/plans', icon: Star },
        { name: 'Integrações (API)', href: '/dashboard/integrations', icon: Plug },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex dark:bg-gray-950 transition-colors duration-200 font-sans">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 dark:bg-gray-900 dark:border-gray-800 transition-all duration-200 shadow-xl shadow-gray-200/50 dark:shadow-none z-20">
                <div className="p-8 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-white">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30">
                            <ShoppingBag size={24} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Vitrine360</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-4 dark:text-gray-500">Menu Principal</div>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`group flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 translate-x-1'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600 dark:text-gray-500 dark:group-hover:text-white transition-colors'} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mx-4 mb-4 relative">
                    {/* User Menu Popup */}
                    {isUserMenuOpen && (
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in origin-bottom">
                            <div className="p-2 space-y-1">
                                <Link
                                    to="/dashboard/settings"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                >
                                    <Settings size={18} />
                                    <span className="font-medium">Configurações</span>
                                </Link>
                                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium">Sair</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* User Profile Button */}
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className={`w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-3 flex items-center space-x-3 hover:bg-white hover:shadow-md hover:border-indigo-100 dark:hover:bg-gray-800 dark:hover:border-gray-600 transition-all ${isUserMenuOpen ? 'ring-2 ring-indigo-500 border-transparent dark:border-transparent' : ''}`}
                    >
                        <div className="w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md">
                            {user?.logo_url ? (
                                <img src={user.logo_url} alt="Logo" className="w-full h-full rounded-full object-cover bg-white dark:bg-gray-800" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-2 border-transparent">
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{user?.name?.charAt(0) || 'U'}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden text-left">
                            <p className="text-sm font-bold text-gray-900 truncate dark:text-white">{user?.name || 'Lojista'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Plano {user?.plan === 'pro' ? 'PRO' : user?.plan === 'enterprise' ? 'Enterprise' : 'Grátis'}</p>
                        </div>
                        <div className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}>
                            <div className="bg-white dark:bg-gray-700 p-1.5 rounded-lg shadow-sm">
                                <Settings size={14} />
                            </div>
                        </div>
                    </button>

                    {/* Theme Toggle Absolute */}
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                        className="absolute -top-3 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-all transform hover:scale-110 z-10"
                        title="Alternar Tema"
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 p-4 flex justify-between items-center dark:bg-gray-900/80 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <ShoppingBag size={20} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vitrine360</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-gray-300">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 mt-16 md:mt-0 overflow-y-auto w-full max-w-[1600px] mx-auto">
                <Outlet />
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden pt-20 px-4 dark:bg-gray-900 overflow-y-auto">
                    <nav className="space-y-2 pb-8">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 dark:text-gray-500">Minha Conta</div>

                            <Link
                                to="/dashboard/settings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 mb-2"
                            >
                                <Settings size={20} />
                                <span className="font-medium">Configurações</span>
                            </Link>

                            <div className="flex items-center gap-3 mb-4 px-2 mt-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold dark:bg-indigo-900 dark:text-indigo-400">
                                    {user?.logo_url ? (
                                        <img src={user.logo_url} alt="Logo" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        user?.name?.charAt(0) || 'U'
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold dark:text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-500">Plano {user?.plan === 'pro' ? 'PRO' : user?.plan === 'enterprise' ? 'Enterprise' : 'Grátis'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Sair</span>
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Layout;
