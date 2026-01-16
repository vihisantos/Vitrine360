import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar para Home
                    </Link>

                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Termos de Uso</h1>

                    <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
                        <p>
                            Ao acessar ao site Vitrine360, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6">1. Licença de Uso</h3>
                        <p>
                            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Vitrine360 , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Modificar ou copiar os materiais;</li>
                            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
                            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Vitrine360;</li>
                            <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6">2. Isenção de responsabilidade</h3>
                        <p>
                            Os materiais no site da Vitrine360 são fornecidos "como estão". Vitrine360 não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6">3. Limitações</h3>
                        <p>
                            Em nenhum caso o Vitrine360 ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Vitrine360.
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-500">
                            <p>Estes termos são efetivos a partir de <strong>Dezembro/2025</strong>.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Terms;
