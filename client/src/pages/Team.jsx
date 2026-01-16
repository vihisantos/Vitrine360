import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Trash2, ShieldCheck, Mail, AlertTriangle, Crown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Team = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const isEnterprise = user?.plan === 'enterprise';

    useEffect(() => {
        if (isEnterprise) {
            fetchTeam();
        } else {
            setLoading(false);
        }
    }, [isEnterprise]);

    const fetchTeam = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/team', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setMembers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        setInviteLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('http://localhost:5000/api/team/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ email: inviteEmail })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Erro ao enviar convite');

            setMessage({ type: 'success', text: 'Convite enviado com sucesso!' });
            setInviteEmail('');
            fetchTeam();
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setInviteLoading(false);
        }
    };

    const handleRemove = async (id) => {
        if (!window.confirm('Tem certeza que deseja remover este membro?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/team/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            if (res.ok) {
                fetchTeam();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!isEnterprise) {
        return (
            <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
                <div className="mx-auto w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Crown size={40} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recurso Exclusivo Empresarial</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                        O gerenciamento de equipe e acesso multi-usuário está disponível apenas no plano Empresarial.
                        Convide até 3 membros para colaborar na sua gestão.
                    </p>
                </div>
                <div className="pt-4">
                    <Link
                        to="/dashboard/plans"
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
                    >
                        <Crown size={20} />
                        Fazer Upgrade Agora
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Gestão de Equipe</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie o acesso dos membros da sua equipe.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm font-medium border border-indigo-100 dark:border-indigo-800">
                    <Users size={16} />
                    <span>{members.length} / 3 Membros</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invite Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <UserPlus size={20} className="text-indigo-600 dark:text-indigo-400" />
                            Convidar Membro
                        </h3>

                        {message.text && (
                            <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleInvite} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email do Colaborador</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        placeholder="email@exemplo.com"
                                        className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={members.length >= 3 || inviteLoading}
                                className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {inviteLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Enviar Convite
                                    </>
                                )}
                            </button>
                            {members.length >= 3 && (
                                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                                    <AlertTriangle size={12} />
                                    Limite de membros atingido
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Team List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <ShieldCheck size={20} className="text-indigo-600 dark:text-indigo-400" />
                                Membros Ativos
                            </h3>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-8"><Loader /></div>
                        ) : members.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                <Users size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Nenhum membro convidado ainda.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {members.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                                {member.member_email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{member.member_email}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${member.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                        {member.status === 'accepted' ? 'Aceito' : 'Pendente'}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(member.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(member.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Remover acesso"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
