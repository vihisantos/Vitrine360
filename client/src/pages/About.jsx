import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Users, Target } from 'lucide-react';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-20 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Nossa Missão é Simplificar o Seu Negócio</h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Nascemos com o propósito de democratizar a gestão empresarial para pequenos e médios empreendedores no Brasil. Acreditamos que tecnologia de ponta não precisa ser complicada ou cara.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Equipe trabalhando"
                            className="rounded-2xl shadow-xl hover:scale-[1.02] transition duration-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            A Vitrine360 é uma startup de tecnologia focada em soluções SaaS (Software as a Service) para o varejo. Fundada em 2024, nossa plataforma já ajudou centenas de lojistas a sair das planilhas e cadernos para uma gestão digital e eficiente.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Nossa equipe é formada por especialistas em tecnologia, design e negócios, todos unidos pela paixão de ver nossos clientes crescendo.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Users, title: "Foco no Cliente", desc: "Desenvolvemos cada funcionalidade ouvindo quem está no balcão todos os dias." },
                        { icon: Target, title: "Simplicidade", desc: "Tornamos o complexo em algo simples e intuitivo. Sem manuais gigantes." },
                        { icon: CheckCircle, title: "Transparência", desc: "Sem letras miúdas. Nossos planos e preços são claros e justos." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
