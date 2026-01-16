import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 md:p-6 animate-slide-up">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">🍪 Nós usamos cookies</h3>
                    <p className="text-sm text-gray-600">
                        Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                        Ao continuar navegando, você concorda com nossa <Link to="/privacy-policy" className="text-indigo-600 hover:underline">Política de Privacidade</Link>.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-500 hover:text-gray-700 font-medium text-sm md:hidden"
                    >
                        Agora não
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200 whitespace-nowrap"
                    >
                        Aceitar e Continuar
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="hidden md:block p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
