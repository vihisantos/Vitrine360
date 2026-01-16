import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Code, Megaphone, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const Careers = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-20 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Junte-se ao Time Vitrine360</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Estamos sempre em busca de talentos que queiram impactar o varejo brasileiro. Confira nossas vagas abertas.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="grid gap-6">
                    {[
                        { title: "Desenvolvedor Frontend Sênior", type: "Remoto", dept: "Engenharia", icon: Code },
                        { title: "Product Designer (UI/UX)", type: "Híbrido - SP", dept: "Produto", icon: Heart },
                        { title: "Analista de Marketing de Performance", type: "Remoto", dept: "Marketing", icon: Megaphone },
                        { title: "Executivo de Vendas (SaaS)", type: "Remoto", dept: "Vendas", icon: Briefcase },
                    ].map((job, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row justify-between items-center group cursor-pointer">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                    <job.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">{job.title}</h3>
                                    <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                        <span>{job.dept}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 font-semibold rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition">
                                Ver Detalhes
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-4">Não encontrou a vaga ideal?</p>
                    <a href="mailto:talentos@vitrine360.com.br" className="text-indigo-600 font-bold hover:underline">
                        Envie seu currículo para talentos@vitrine360.com.br
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Careers;
