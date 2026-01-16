import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Dashboard = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [stats, setStats] = useState({
        salesToday: 0,
        criticalStock: 0,
        totalClients: 0,
        recentSales: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${user.token}` };

                // Fetch Sales
                const salesRes = await fetch('http://localhost:5000/api/sales', { headers });
                const salesData = await salesRes.json();

                // Calculate sales today
                const today = new Date().toISOString().split('T')[0];
                const salesToday = salesData
                    .filter(s => s.sale_date.startsWith(today))
                    .reduce((acc, curr) => acc + Number(curr.total_price), 0);

                // Get Recent Sales (Last 5)
                const recentSales = salesData
                    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date))
                    .slice(0, 5);

                // Fetch Products for Critical Stock
                const productsRes = await fetch('http://localhost:5000/api/products', { headers });
                const productsData = await productsRes.json();
                const criticalStock = productsData.filter(p => p.stock <= p.min_stock).length;

                // Fetch Appointments for Clients (Proxy for clients)
                const aptRes = await fetch('http://localhost:5000/api/appointments', { headers });
                const aptData = await aptRes.json();
                const uniqueClients = new Set(aptData.map(a => a.client_name)).size;

                setStats({
                    salesToday,
                    criticalStock,
                    totalClients: uniqueClients,
                    recentSales
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchStats();
        }
    }, [user]);

    const cards = [
        {
            title: 'Vendas Hoje',
            value: `R$ ${stats.salesToday.toFixed(2)}`,
            icon: TrendingUp,
            color: 'bg-linear-to-br from-green-500 to-emerald-600',
            textColor: 'text-white',
            subtext: '+12% vs ontem (simulado)'
        },
        {
            title: 'Estoque Crítico',
            value: `${stats.criticalStock} Produtos`,
            icon: AlertTriangle,
            color: 'bg-linear-to-br from-amber-500 to-orange-600',
            textColor: 'text-white',
            subtext: 'Requer atenção imediata'
        },
        {
            title: 'Clientes Totais',
            value: `${stats.totalClients}`,
            icon: Users,
            color: 'bg-linear-to-br from-indigo-500 to-purple-600',
            textColor: 'text-white',
            subtext: 'Novos clientes este mês'
        },
    ];

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader />
        </div>
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {getGreeting()}, <span className="text-indigo-600 dark:text-indigo-400">{user?.name || 'Lojista'}</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Aqui está o resumo do seu negócio hoje, {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}.
                    </p>
                </div>
                {/* Optional Date Picker or Filter could go here */}
            </div>

            {/* Payment Success Banner */}
            {new URLSearchParams(location.search).get('status') === 'success' && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm flex items-start animate-fade-in-down mb-6 dark:bg-green-900/20 dark:text-green-400">
                    <div className="shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-bold">Pagamento Aprovado!</h3>
                        <p className="text-sm mt-1">Sua assinatura foi confirmada. Aproveite os recursos PRO do Vitrine360!</p>
                    </div>
                    <button onClick={() => window.history.replaceState({}, document.title, window.location.pathname)} className="ml-auto text-green-500 hover:text-green-700">
                        <span className="text-xl">&times;</span>
                    </button>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`relative overflow-hidden p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 ${stat.color} ${stat.textColor} transition-transform hover:scale-[1.02] duration-300`}>
                            {/* Decorative Circle */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Icon size={24} className="text-white" />
                                </div>
                                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                                    {stat.subtext}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium opacity-90">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Sales Section (Span 2 cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Vendas Recentes</h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium dark:text-indigo-400">Ver todas</button>
                    </div>

                    <div className="space-y-4">
                        {stats.recentSales.length > 0 ? (
                            stats.recentSales.map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">Produto #{sale.product_id}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(sale.sale_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">R$ {Number(sale.total_price).toFixed(2)}</p>
                                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">Concluído</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <ShoppingBag size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Nenhuma venda recente</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats / Chart Placeholder (Span 1 col) */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Desempenho Semanal</h3>

                    {/* CSS-only simple bar chart visual */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-4">
                        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                            <div key={i} className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg relative group h-full flex items-end">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t-sm transition-all duration-500 hover:bg-indigo-600 dark:hover:bg-indigo-500"
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Seg</span>
                        <span>Dom</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
