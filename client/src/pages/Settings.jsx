import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Upload, User, Building, Phone, MapPin, Image, Users, UserPlus, Trash2, ShieldCheck, Mail, AlertTriangle, Crown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile State
    const [formData, setFormData] = useState({
        name: '',
        cnpj: '',
        phone: '',
        address: '',
        logo_url: ''
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

    // Team State
    const [members, setMembers] = useState([]);
    const [teamLoading, setTeamLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [teamMessage, setTeamMessage] = useState({ type: '', text: '' });

    const isEnterprise = user?.plan === 'enterprise';

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                cnpj: user.cnpj || '',
                phone: user.phone || '',
                address: user.address || '',
                logo_url: user.logo_url || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === 'team' && isEnterprise) {
            fetchTeam();
        }
    }, [activeTab, isEnterprise]);

    const handleProfileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileMessage({ type: '', text: '' });

        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Erro ao atualizar perfil');

            updateUser(data);
            setProfileMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
        } catch (error) {
            setProfileMessage({ type: 'error', text: error.message });
        } finally {
            setProfileLoading(false);
        }
    };

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
            setTeamLoading(false);
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        setInviteLoading(true);
        setTeamMessage({ type: '', text: '' });

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

            setTeamMessage({ type: 'success', text: 'Convite enviado com sucesso!' });
            setInviteEmail('');
            fetchTeam();
        } catch (error) {
            setTeamMessage({ type: 'error', text: error.message });
        } finally {
            setInviteLoading(false);
        }
    };

    const handleRemoveMember = async (id) => {
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

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Configurações</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie seu perfil e equipe.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'profile'
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    Perfil da Empresa
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'team'
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    Gestão de Equipe
                </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
                    <div className="p-8">
                        {profileMessage.text && (
                            <div className={`mb-6 p-4 rounded-xl ${profileMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {profileMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <User size={20} className="text-indigo-600 dark:text-indigo-400" />
                                        Dados Pessoais
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Business Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Building size={20} className="text-indigo-600 dark:text-indigo-400" />
                                        Dados da Empresa
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNPJ</label>
                                        <input
                                            name="cnpj"
                                            value={formData.cnpj}
                                            onChange={handleProfileChange}
                                            placeholder="00.000.000/0000-00"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone / WhatsApp</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone size={16} className="text-gray-400" />
                                            </div>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleProfileChange}
                                                placeholder="(00) 00000-0000"
                                                className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    Endereço
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço Completo</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleProfileChange}
                                        rows="3"
                                        placeholder="Rua Exemplo, 123 - Bairro, Cidade - UF"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Image size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    Identidade Visual
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL do Logo</label>
                                    <div className="flex gap-4 items-start">
                                        <input
                                            name="logo_url"
                                            value={formData.logo_url}
                                            onChange={handleProfileChange}
                                            placeholder="https://exemplo.com/logo.png"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                                        />
                                        <div className="w-16 h-16 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                                            {formData.logo_url ? (
                                                <img src={formData.logo_url} alt="Logo Preview" className="w-full h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                                            ) : (
                                                <Upload size={20} className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Cole o link direto da imagem da sua logo.</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {profileLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                    ) : (
                                        <Save size={20} />
                                    )}
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
                <div className="animate-fade-in">
                    {!isEnterprise ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="mx-auto w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                <Crown size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Recurso Exclusivo Empresarial</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6">
                                O gerenciamento de equipe e acesso multi-usuário está disponível apenas no plano Empresarial.
                            </p>
                            <Link
                                to="/dashboard/plans"
                                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
                            >
                                <Crown size={20} />
                                Fazer Upgrade
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Invite Form */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <UserPlus size={20} className="text-indigo-600 dark:text-indigo-400" />
                                        Convidar Membro
                                    </h3>

                                    {teamMessage.text && (
                                        <div className={`mb-4 p-3 rounded-lg text-sm ${teamMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {teamMessage.text}
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
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                            {members.length} / 3 Membros
                                        </div>
                                    </div>

                                    {teamLoading ? (
                                        <div className="text-center py-8 text-gray-500">Carregando...</div>
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
                                                        onClick={() => handleRemoveMember(member.id)}
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
                    )}
                </div>
            )}
        </div>
    );
};

export default Settings;
