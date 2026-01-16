import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo-v2.png';

const AuthLayout = ({ children, title, subtitle }) => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex w-full">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-2xl font-bold">
                        <div className="h-12 w-12 flex items-center justify-center bg-white rounded-xl shadow-lg p-2">
                            <img src={logo} alt="Vitrine360" className="w-full h-full object-contain" />
                        </div>
                        <span>Vitrine360</span>
                    </div>
                </div>

                <div className="relative z-10 space-y-6">
                    <h1 className="text-5xl font-bold leading-tight">
                        Transforme seu <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                            Negócio Online
                        </span>
                    </h1>
                    <p className="text-lg text-indigo-200 max-w-md">
                        A plataforma completa para gerenciar estoque, vendas e clientes em um só lugar. Simples, rápido e eficiente.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                            <Star className="text-yellow-400 fill-yellow-400" size={16} />
                            <span className="text-sm font-medium">Gestão Premium</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                            <ShieldCheck className="text-green-400" size={16} />
                            <span className="text-sm font-medium">100% Seguro</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-indigo-300">
                    © {new Date().getFullYear()} Vitrine360 Inc. Todos os direitos reservados.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {subtitle}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl shadow-indigo-100/50 dark:shadow-none sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700 transition-all duration-200">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
