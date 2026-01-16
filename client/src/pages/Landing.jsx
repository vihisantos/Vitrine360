import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Star, Menu, X, Package, LineChart, Calendar, Instagram, Linkedin, Facebook } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import logo from '../assets/logo-v2.png';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Landing = () => {
    const { user } = useAuth();
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white font-sans text-gray-900">
            {/* Header */}
            <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="h-12 w-auto flex items-center justify-center">
                            <img src={logo} alt="Vitrine360 Logo" className="h-full w-auto object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">Vitrine360</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-indigo-600 transition">Funcionalidades</a>
                        <a href="#pricing" className="hover:text-indigo-600 transition">Planos</a>
                        <a href="#faq" className="hover:text-indigo-600 transition">Dúvidas</a>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <Link to="/dashboard" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200">
                                Ir para Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 underline-offset-4 hover:underline">Entrar</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200">
                                    Começar agora
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600" onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenu && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg">
                        <a href="#features" className="text-gray-600 font-medium">Funcionalidades</a>
                        <a href="#pricing" className="text-gray-600 font-medium">Planos</a>
                        {user ? (
                            <Link to="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center font-semibold">Ir para Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 font-medium">Entrar</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center font-semibold">Começar</Link>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#f5f5f7]">
                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="z-10 animate-fade-in-up">
                        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                            Nova Versão 2.0
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                            Gerencie seu negócio <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">sem complicação.</span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                            O ERP mais completo pelo menor preço do mercado. Controle total de estoque, vendas e financeiro.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center">
                                Criar conta grátis
                            </Link>
                            <a href="#pricing" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition shadow-sm hover:shadow-md text-center">
                                Ver planos
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold">U{i}</div>
                                ))}
                            </div>
                            <p>Mais de 1.000 negócios confiam.</p>
                        </div>
                    </div>
                    <div className="relative z-0 md:h-[600px] flex items-center justify-center">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                            <img src={heroBg} alt="Vitrine360 Dashboard" className="w-full h-full object-cover" />
                            {/* Floating Card */}
                            <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce-slow hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><Check size={20} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Venda realizada</p>
                                        <p className="font-bold text-gray-900">+ R$ 149,90</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decor Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tudo o que você precisa</h2>
                        <p className="text-gray-500 text-lg">Centralize sua operação em um único lugar e ganhe tempo para focar no que importa: seus clientes.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Estoque Inteligente', desc: 'Alertas automáticos de estoque baixo e gestão simplificada de produtos.', icon: Package },
                            { title: 'Gestão Financeira', desc: 'Acompanhe receitas, despesas e lucro em tempo real com gráficos claros.', icon: LineChart },
                            { title: 'Agenda Integrada', desc: 'Organize seus serviços e horários sem conflitos e complicações.', icon: Calendar },
                        ].map((f, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:shadow-2xl hover:bg-white transition-all duration-300">
                                <div className="text-4xl mb-6 bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition text-indigo-600">
                                    <f.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section - Teams Style */}
            <section id="pricing" className="py-24 bg-[#f9fafb]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">Encontre o plano certo para você</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                        {/* Plan 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Iniciante</h3>
                            <p className="text-gray-500 text-sm mb-6">Ideal para quem está começando agora.</p>
                            <div className="text-4xl font-bold text-gray-900 mb-6">Grátis</div>
                            <Link to="/register" className="w-full block text-center border-2 border-indigo-600 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition mb-8">
                                Inscreva-se gratuitamente
                            </Link>
                            <ul className="space-y-4 flex-1">
                                {['Até 17 produtos', '50 vendas/mês', 'Dashboard Básico', 'Suporte por Email'].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="text-green-500 mt-1 mr-3 shrink-0" size={18} />
                                        <span className="text-gray-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plan 2 - Highlighted */}
                        <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-indigo-600 relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MELHOR CUSTO-BENEFÍCIO</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Profissional</h3>
                            <p className="text-gray-500 text-sm mb-6">Para negócios em crescimento.</p>
                            <div className="text-4xl font-bold text-gray-900 mb-1">R$ 49,00</div>
                            <p className="text-gray-400 text-xs mb-6">usuario/mês</p>
                            <Link to="/register" className="w-full block text-center bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg mb-8">
                                Começar Trial de 14 dias
                            </Link>
                            <ul className="space-y-4 flex-1">
                                {[
                                    'Produtos Ilimitados',
                                    'Vendas Ilimitadas',
                                    'Agenda + Integração WhatsApp',
                                    'Relatórios Avançados',
                                    'Suporte Prioritário'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="text-indigo-600 mt-1 mr-3 shrink-0" size={18} />
                                        <span className="text-gray-700 text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plan 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-purple-600 bg-purple-50 text-[10px] font-bold px-3 py-1 rounded-bl-lg">OFERTA DE LANÇAMENTO</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Empresarial</h3>
                            <p className="text-gray-500 text-sm mb-6">Para grandes operações e franquias.</p>
                            <div className="text-4xl font-bold text-gray-900 mb-1">R$ 99,00</div>
                            <p className="text-gray-400 text-xs mb-6">usuario/mês</p>
                            <Link to="/register" className="w-full block text-center border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:border-gray-400 transition mb-8">
                                Começar Agora
                            </Link>
                            <ul className="space-y-4 flex-1">
                                {['Tudo do Profissional', 'Múltiplos Usuários', 'API Dedicada', 'Gerente de Conta', 'Treinamento de Equipe', 'Emissão de Nota Fiscal (Em Breve)'].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="text-green-500 mt-1 mr-3 shrink-0" size={18} />
                                        <span className="text-gray-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Preciso cadastrar cartão de crédito para testar?',
                                a: 'Não! Você pode usar o plano Gratuito para sempre ou testar o Profissional por 14 dias sem informar nenhum dado de pagamento.'
                            },
                            {
                                q: 'Qual a diferença entre os planos Profissional e Empresarial?',
                                a: 'O Profissional é ideal para o "eu-preendedor" que quer remover limites. O Empresarial é focado em times, permitindo adicionar gestores, vendedores e controlar múltiplas filiais.'
                            },
                            {
                                q: 'O sistema emite Nota Fiscal (NF-e)? (Em Breve)',
                                a: 'Estamos em fase final de homologação! Em breve, os planos Profissional e Empresarial contarão com emissor de notas fiscais (NFC-e e NF-e) integrado.'
                            },
                            {
                                q: 'Meus dados estão seguros?',
                                a: 'Segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta e backups automáticos diários para garantir que você nunca perca suas informações.'
                            },
                            {
                                q: 'Como funciona o suporte?',
                                a: 'Temos orgulho do nosso atendimento. Usuários Gratuitos têm suporte por email. Assinantes Profissional e Empresarial têm prioridade via Chat e WhatsApp com especialistas reais.'
                            },
                        ].map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 transition text-left"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-semibold text-gray-900 pr-8">{item.q}</span>
                                    {openFaq === index ? <ChevronUp className="text-indigo-600 shrink-0" /> : <ChevronDown className="text-gray-400 shrink-0" />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-6 bg-white text-gray-600 border-t border-gray-100">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Landing;
