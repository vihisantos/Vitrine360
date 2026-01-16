import React, { useState, useEffect } from 'react';
import { Plus, ArrowUpCircle, ArrowDownCircle, Wallet, FileSpreadsheet, Lock, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Finances = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [finances, setFinances] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
    const [showModal, setShowModal] = useState(false);
    const [newFinance, setNewFinance] = useState({ type: 'income', description: '', amount: '', date: new Date().toISOString().split('T')[0] });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${user.token}` };
        try {
            const [financesRes, summaryRes] = await Promise.all([
                fetch('http://localhost:5000/api/finances', { headers }),
                fetch('http://localhost:5000/api/finances/summary', { headers })
            ]);
            setFinances(await financesRes.json());
            setSummary(await summaryRes.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.token) fetchData();
    }, [user]);

    const handleCreate = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/finances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newFinance)
            });
            if (res.ok) {
                setShowModal(false);
                fetchData();
                setNewFinance({ type: 'income', description: '', amount: '', date: new Date().toISOString().split('T')[0] });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleExport = () => {
        if (user?.plan === 'free') {
            if (window.confirm('Exportação para Excel é exclusiva dos planos PRO e Enterprise. Deseja fazer upgrade agora?')) {
                navigate('/plans');
            }
            return;
        }
        alert('Funcionalidade de exportação será implementada em breve! (Simulação)');
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Controle Financeiro</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Acompanhe seu fluxo de caixa em tempo real.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleExport}
                        className={`px-4 py-2.5 rounded-xl border flex items-center space-x-2 transition font-medium ${user?.plan !== 'free' ? 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}
                    >
                        {user?.plan === 'free' ? <Lock size={16} /> : <FileSpreadsheet size={16} />}
                        <span>Exportar Excel</span>
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={() => { setNewFinance({ ...newFinance, type: 'income' }); setShowModal(true); }} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 flex items-center space-x-2 shadow-lg shadow-emerald-500/20 font-medium transition">
                            <Plus size={18} />
                            <span>Receita</span>
                        </button>
                        <button onClick={() => { setNewFinance({ ...newFinance, type: 'expense' }); setShowModal(true); }} className="bg-rose-600 text-white px-5 py-2.5 rounded-xl hover:bg-rose-700 flex items-center space-x-2 shadow-lg shadow-rose-500/20 font-medium transition">
                            <Plus size={18} />
                            <span>Despesa</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Receitas Totais</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">R$ {summary.income.toFixed(2)}</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in delay-50 group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Despesas Totais</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">R$ {summary.expense.toFixed(2)}</h3>
                </div>

                <div className="bg-indigo-600 bg-[linear-gradient(45deg,transparent_25%,rgba(68,51,255,.2)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%] bg-position-[-100%_0,0_0] bg-no-repeat p-6 rounded-2xl shadow-xl shadow-indigo-500/20 text-white animate-shine group hover:shadow-indigo-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Wallet size={24} />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-indigo-100 mb-1">Saldo Atual</p>
                    <h3 className="text-3xl font-bold text-white">R$ {summary.balance.toFixed(2)}</h3>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">Histórico de Transações</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="p-5">Descrição</th>
                                <th className="p-5">Data</th>
                                <th className="p-5">Tipo</th>
                                <th className="p-5 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-400"><div className="flex justify-center"><Loader /></div></td></tr>
                            ) : finances.length === 0 ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-400">Nenhuma transação registrada.</td></tr>
                            ) : (
                                finances.map((op) => (
                                    <tr key={op.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="p-5 font-medium text-gray-900 dark:text-white">{op.description}</td>
                                        <td className="p-5 text-gray-500 dark:text-gray-400 text-sm">{new Date(op.date).toLocaleDateString()}</td>
                                        <td className="p-5">
                                            {op.type === 'income' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                    Receita
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                                                    Despesa
                                                </span>
                                            )}
                                        </td>
                                        <td className={`p-5 text-right font-bold ${op.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {op.type === 'income' ? '+' : '-'} R$ {Number(op.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-in">
                        <h3 className={`text-2xl font-bold mb-6 ${newFinance.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {newFinance.type === 'income' ? 'Nova Receita' : 'Nova Despesa'}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    placeholder={newFinance.type === 'income' ? "Ex: Venda de Produto" : "Ex: Conta de Luz"}
                                    value={newFinance.description}
                                    onChange={e => setNewFinance({ ...newFinance, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor (R$)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="0,00"
                                    value={newFinance.amount}
                                    onChange={e => setNewFinance({ ...newFinance, amount: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    value={newFinance.date}
                                    onChange={e => setNewFinance({ ...newFinance, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition">Cancelar</button>
                            <button
                                onClick={handleCreate}
                                className={`px-5 py-2.5 text-white rounded-lg font-medium transition shadow-lg ${newFinance.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'}`}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finances;
