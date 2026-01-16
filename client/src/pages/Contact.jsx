import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar para Home
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-10 lg:p-14 bg-indigo-600 text-white">
                        <h1 className="text-3xl font-extrabold mb-6">Entre em Contato</h1>
                        <p className="text-indigo-100 mb-10 text-lg">
                            Tem alguma dúvida sobre os planos ou precisa de ajuda técnica? Nossa equipe está pronta para atender você.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-500/50 rounded-lg"><Mail size={20} /></div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-indigo-200">contato@vitrine360.com.br</p>
                                    <p className="text-indigo-200">suporte@vitrine360.com.br</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-500/50 rounded-lg"><Phone size={20} /></div>
                                <div>
                                    <h4 className="font-bold">WhatsApp / Telefone</h4>
                                    <p className="text-indigo-200">(11) 99999-9999</p>
                                    <p className="text-indigo-200 text-sm opacity-70">Seg a Sex, 9h às 18h</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-500/50 rounded-lg"><MapPin size={20} /></div>
                                <div>
                                    <h4 className="font-bold">Escritório</h4>
                                    <p className="text-indigo-200">Av. Paulista, 1000 - Bela Vista</p>
                                    <p className="text-indigo-200">São Paulo - SP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 lg:p-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma mensagem</h2>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Seu nome" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="seu@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>Dúvida sobre Planos</option>
                                    <option>Suporte Técnico</option>
                                    <option>Parcerias</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Como podemos ajudar?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                <Send size={18} />
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
