import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import logo from '../assets/logo-v2.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full p-2">
                                <img src={logo} alt="Vitrine360 Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Vitrine360</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Transformando a gestão de pequenos e médios negócios com tecnologia acessível e poderosa. Simplifique, venda mais e cresça.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-indigo-600 transition text-gray-900 hover:text-white"><Instagram size={18} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-indigo-600 transition text-gray-900 hover:text-white"><Linkedin size={18} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-indigo-600 transition text-gray-900 hover:text-white"><Facebook size={18} /></a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Produto</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/#features" className="hover:text-indigo-400 transition">Funcionalidades</Link></li>
                            <li><Link to="/#pricing" className="hover:text-indigo-400 transition">Planos e Preços</Link></li>
                            <li><Link to="/#faq" className="hover:text-indigo-400 transition">Perguntas Frequentes</Link></li>
                            <li><span className="text-gray-600 cursor-not-allowed">Roadmap (Em breve)</span></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Empresa</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-indigo-400 transition">Sobre Nós</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-400 transition">Carreiras</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-400 transition">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition">Contato</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Fique por dentro</h4>
                        <p className="text-gray-400 text-sm mb-4">Receba dicas de gestão e novidades da plataforma.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu melhor email"
                                className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm text-white w-full focus:ring-2 focus:ring-indigo-600"
                            />
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition">Ok</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div>&copy; 2025 Vitrine360 Tecnologia Ltda. CNPJ: 00.000.000/0001-00.</div>
                    <div className="flex gap-6">
                        <Link to="/terms" className="hover:text-white transition">Termos de Uso</Link>
                        <Link to="/privacy-policy" className="hover:text-white transition">Política de Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
