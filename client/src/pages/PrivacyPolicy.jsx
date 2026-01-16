import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar para Home
                </Link>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de Privacidade</h1>

                <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
                    <p>
                        A sua privacidade é importante para nós. É política do <strong>Vitrine360</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Vitrine360, e outros sites que possuímos e operamos.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">1. Informações que coletamos</h3>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Dados de cadastro (Nome, Email, Senha criptografada).</li>
                        <li>Dados do negócio (Produtos, Vendas, Clientes).</li>
                        <li>Dados de pagamento (Processados de forma segura via Mercado Pago).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">2. Uso de Cookies</h3>
                    <p>
                        O Vitrine360 utiliza cookies para melhorar a experiência do usuário, desempenho e analisar como você interage com nosso site.
                    </p>
                    <p>
                        <strong>O que são cookies?</strong><br />
                        Cookies são pequenos arquivos de texto baixados no seu computador para melhorar sua experiência.
                    </p>
                    <p>
                        <strong>Como usamos?</strong><br />
                        Utilizamos cookies para:
                        <ul className="list-disc pl-5 mt-2">
                            <li>Lembrar suas preferências de login (Sessão).</li>
                            <li>Entender como você usa o sistema para melhorá-lo.</li>
                            <li>Finalidades de segurança e prevenção a fraudes.</li>
                        </ul>
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">3. Armazenamento de Dados</h3>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">4. Compartilhamento de Dados</h3>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">5. Seus Direitos</h3>
                    <p>
                        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                    </p>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-500">
                        <p>Esta política é efetiva a partir de <strong>Dezembro/2025</strong>.</p>
                        <p className="mt-2">Vitrine360 SaaS Ltda.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
