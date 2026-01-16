import React, { useState } from 'react';
import { Check, Star, Shield, Zap, CheckCircle2, Crown, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Plans = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

    const handleSubscribe = async (price, planType) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/payments/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ price, planType })
            });
            const data = await response.json();

            if (data.init_point) {
                window.location.href = data.init_point; // Redirect to Mercado Pago
            } else {
                alert('Erro ao iniciar pagamento.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Escolha o plano ideal para seu negócio</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Escalone suas vendas com ferramentas poderosas. Comece grátis, faça upgrade quando crescer.
                </p>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center mt-8">
                    <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex items-center relative">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            Anual
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">-20%</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Free Plan */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col relative transition-all hover:border-gray-300 dark:hover:border-gray-600">
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4 text-gray-600 dark:text-gray-300">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Iniciante</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Para quem está começando a organizar a casa.</p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-5xl font-extrabold tracking-tight">R$0</span>
                            <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">/mês</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {['Até 17 produtos', '50 vendas/mês', 'Dashboard Básico', 'Suporte por Email', 'Exportação Limitada'].map((feature) => (
                            <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        disabled={user?.plan === 'free'}
                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${user?.plan === 'free' ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-default' : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'}`}
                    >
                        {user?.plan === 'free' ? 'Plano Atual' : 'Voltar para Grátis'}
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border-2 border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-500/10 flex flex-col relative scale-105 z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        Melhor Custo-Benefício
                    </div>

                    <div className="mb-6">
                        <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-indigo-500/30">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profissional</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Tudo ilimitado para seu negócio voar.</p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-5xl font-extrabold tracking-tight">R$49</span>
                            <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">/mês</span>
                        </div>
                        {billingCycle === 'yearly' && <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1">Economize R$120 /ano</p>}
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {['Produtos Ilimitados', 'Vendas Ilimitadas', 'Dashboard Avançado', 'Agenda Completa', 'Suporte Prioritário', 'Exportação Excel', 'Emissão de Nota Fiscal (Em Breve)'].map((feature) => (
                            <li key={feature} className="flex items-center text-gray-900 dark:text-white font-medium">
                                <CheckCircle2 className="shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleSubscribe(49.00, 'professional')}
                        disabled={loading || user?.plan === 'professional'}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processando...' : user?.plan === 'professional' ? 'Seu Plano Atual' : 'Começar Agora'}
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-gray-900 dark:bg-black p-8 rounded-3xl border border-gray-800 dark:border-gray-800 shadow-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="absolute top-4 right-4 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Preço de Lançamento
                    </div>

                    <div className="mb-6 relative">
                        <div className="w-12 h-12 bg-gray-800 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-4 text-purple-400 border border-gray-700">
                            <Crown size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Empresarial</h3>
                        <p className="text-sm text-gray-400 mt-2">Para quem quer crescer sem limites.</p>
                    </div>

                    <div className="mb-8 relative">
                        <div className="flex items-baseline text-white">
                            <span className="text-5xl font-extrabold tracking-tight">R$99</span>
                            <span className="ml-2 text-lg font-medium text-gray-400">/mês</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1 relative">
                        {['5 Usuários Admin', 'Múltiplas Filiais', 'API Dedicada', 'Gerente de Conta', 'Whitelabel', 'Backup em Tempo Real', 'SLA Garantido'].map((feature) => (
                            <li key={feature} className="flex items-center text-gray-300">
                                <CheckCircle2 className="shrink-0 w-5 h-5 text-purple-400 mr-3" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleSubscribe(99.00, 'enterprise')}
                        disabled={loading || user?.plan === 'enterprise'}
                        className="w-full py-4 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all relative z-10"
                    >
                        {user?.plan === 'enterprise' ? 'Plano Atual' : 'Fazer Upgrade'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Plans;
