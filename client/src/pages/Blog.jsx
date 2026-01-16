import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import Footer from '../components/Footer';

const Blog = () => {
    const posts = [
        {
            title: "Como organizar o estoque da sua loja para vender mais",
            excerpt: "Dicas práticas para evitar perdas e garantir que seus produtos estrela estejam sempre disponíveis.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "28 Dez 2024",
            author: "Maria Silva"
        },
        {
            title: "5 Estratégias de fidelização de clientes",
            excerpt: "Aprenda como transformar compradores eventuais em clientes fiéis usando ferramentas simples.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "22 Dez 2024",
            author: "João Souza"
        },
        {
            title: "Fluxo de Caixa: O guia definitivo para iniciantes",
            excerpt: "Entenda de uma vez por todas como gerenciar as entradas e saídas do seu negócio.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "15 Dez 2024",
            author: "Ana Costa"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-20 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Blog Vitrine360</h1>
                    <p className="text-xl text-gray-500">Conteúdos exclusivos sobre gestão, varejo e empreendedorismo.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col cursor-pointer group">
                            <div className="h-48 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">{post.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex-1">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1"><User size={12} /> {post.author}</div>
                                    <div className="flex items-center gap-1"><Clock size={12} /> {post.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
