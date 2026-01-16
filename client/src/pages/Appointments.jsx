import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, User, Scissors, Check, X, MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Appointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newApt, setNewApt] = useState({ client_name: '', service: '', date_time: '', staff: '' });
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/appointments', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            // Sort by date
            setAppointments(data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.token) fetchAppointments();
    }, [user]);

    const handleCreate = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newApt)
            });
            if (res.ok) {
                setShowModal(false);
                fetchAppointments();
                setNewApt({ client_name: '', service: '', date_time: '', staff: '' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Group appointments by date
    const groupedAppointments = appointments.reduce((groups, apt) => {
        const date = new Date(apt.date_time).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(apt);
        return groups;
    }, {});

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Agenda</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie seus atendimentos e horários.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                >
                    <Plus size={20} />
                    <span className="font-semibold">Novo Agendamento</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Mini Calendar / Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-indigo-600" />
                            Resumo do Dia
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Agendados</span>
                                <span className="font-bold text-gray-900 dark:text-white text-lg">{appointments.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
                                <span className="text-sm text-green-700 dark:text-green-400">Confirmados</span>
                                <span className="font-bold text-green-700 dark:text-green-400 text-lg">
                                    {appointments.filter(a => a.status === 'confirmed').length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Appointment List */}
                <div className="lg:col-span-3 space-y-8">
                    {loading ? (
                        <div className="text-center py-10 text-gray-400">Carregando agenda...</div>
                    ) : Object.keys(groupedAppointments).length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <CalendarIcon size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                            <p className="text-gray-500 dark:text-gray-400">Nenhum agendamento encontrado.</p>
                        </div>
                    ) : (
                        Object.entries(groupedAppointments).map(([date, apts]) => (
                            <div key={date} className="animate-fade-in">
                                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 capitalize sticky top-0 bg-gray-50 dark:bg-gray-900 py-2 z-10">
                                    {date}
                                </h3>
                                <div className="space-y-4">
                                    {apts.map((apt) => (
                                        <div key={apt.id} className="group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-l-4 border-l-indigo-500">
                                            {/* Time */}
                                            <div className="flex md:flex-col items-center gap-2 min-w-[80px]">
                                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                                    <Clock size={20} />
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white text-lg">
                                                    {new Date(apt.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                                    {apt.client_name}
                                                </h4>
                                                <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Scissors size={14} />
                                                        <span>{apt.service}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <User size={14} />
                                                        <span>{apt.staff}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status & Actions */}
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                                                    ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                    {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                                </span>
                                                <button className="text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Novo Agendamento</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Cliente</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ex: Maria Silva"
                                    value={newApt.client_name}
                                    onChange={e => setNewApt({ ...newApt, client_name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Serviço</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Ex: Corte"
                                        value={newApt.service}
                                        onChange={e => setNewApt({ ...newApt, service: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profissional</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Ex: Ana"
                                        value={newApt.staff}
                                        onChange={e => setNewApt({ ...newApt, staff: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data e Hora</label>
                                <input
                                    type="datetime-local"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    value={newApt.date_time}
                                    onChange={e => setNewApt({ ...newApt, date_time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition shadow-lg shadow-indigo-500/30"
                            >
                                Agendar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
