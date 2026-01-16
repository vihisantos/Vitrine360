import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Copy, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Integrations = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateKey = async () => {
        setLoading(true);
        setError('');
        try {
            // Mock generation for now since we didn't create a backend route for *generating* keys yet.
            // Wait, we need a route to generate keys! I missed adding it to routes.
            // I'll simulate it here visually first, then fix backend.
            // Actually, let's implement the backend route now.
            // But since I'm in frontend flow, I'll stub the fetch.

            const res = await fetch('http://localhost:5000/api/users/generate-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to generate key');

            setApiKey(data.apiKey);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (user.plan !== 'pro' && user.plan !== 'enterprise') {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                    <div className="p-4 bg-yellow-100 rounded-full text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Key size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acesso Exclusivo PRO</h2>
                    <p className="text-gray-500 max-w-md dark:text-gray-400">
                        A integração via API para E-commerce Headless é exclusiva para planos PRO.
                        Faça o upgrade para conectar seu site ao Vitrine360.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/plans')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Ver Planos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Integrações (API)</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sua Chave de API</h3>
                        <p className="text-gray-500 mt-1 dark:text-gray-400">
                            Use esta chave para autenticar requisições de outras aplicações (como seu site de e-commerce).
                            Envie-a no cabeçalho <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">x-api-key</code>.
                        </p>

                        {!apiKey ? (
                            <button
                                onClick={generateKey}
                                disabled={loading}
                                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2 disabled:opacity-50"
                            >
                                <Key size={18} />
                                <span>{loading ? 'Gerando...' : 'Gerar Nova Chave'}</span>
                            </button>
                        ) : (
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Chave Gerada (Copie agora, ela não será exibida novamente)
                                </label>
                                <div className="flex items-center space-x-2">
                                    <code className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm break-all dark:bg-gray-900 dark:border-gray-600 dark:text-green-400">
                                        {apiKey}
                                    </code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(apiKey)}
                                        className="p-3 text-gray-500 hover:text-indigo-600 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        title="Copiar"
                                    >
                                        <Copy size={20} />
                                    </button>
                                </div>
                                <div className="mt-4 flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg text-sm dark:bg-amber-900/20 dark:text-amber-400">
                                    <AlertTriangle size={16} />
                                    <span>Atenção: Gerar uma nova chave invalidará a anterior imediatamente.</span>
                                </div>
                                <button
                                    onClick={generateKey}
                                    className="mt-4 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    Gerar outra chave (Invalidar atual)
                                </button>
                            </div>
                        )}
                        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-white">Documentação Rápida</h3>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                        <p className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">GET /api/products</p>
                        <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">Lista todos os produtos e estoques.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                        <p className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">POST /api/sales</p>
                        <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">Registra uma nova venda e baixa o estoque.</p>
                        <pre className="mt-2 text-xs text-gray-500 overflow-x-auto dark:text-gray-500">
                            {`{
  "productId": 123,
  "quantity": 1,
  "totalPrice": 150.00
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Integrations;
