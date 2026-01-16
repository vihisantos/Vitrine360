import React, { useEffect } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';

const CardValidation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'pt-BR' });
    }, []);

    const initialization = {
        amount: 1, // Validation amount (R$ 1.00)
        preferenceId: null, // Not needed for card token generation only, but Payment brick handles flow
    };

    const onSubmit = async ({ selectedPaymentMethod, formData }) => {
        // Callback called when user clicks "Pay"
        // We get the data to send to our backend
        console.log("MP Submit", formData);

        try {
            const response = await fetch('http://localhost:5000/api/payments/verify-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    paymentMethodId: formData.payment_method_id,
                    token: formData.token,
                    email: formData.payer.email,
                    // other data...
                }),
            });

            if (response.ok) {
                alert('Cartão verificado com sucesso! Bem-vindo ao Plano Gratuito.');
                navigate('/dashboard');
            } else {
                alert('Erro na verificação. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão.');
        }
    };

    const onError = async (error) => {
        console.log(error);
    };

    const onReady = async () => {
        // Callback called when Brick is ready
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verificação de Segurança 🛡️
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Para ativar seu <span className="font-bold text-indigo-600">Plano Gratuito Vitalício</span>, precisamos verificar que você é uma pessoa real.
                </p>
                <p className="mt-1 text-center text-xs text-gray-500">
                    Não será feita nenhuma cobrança agora. É apenas uma validação anti-fraude.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Payment
                        initialization={initialization}
                        customization={{
                            paymentMethods: {
                                creditCard: "all",
                                debitCard: "all",
                                ticket: "all",
                                bankTransfer: "all",
                                maxInstallments: 1
                            },
                            visual: {
                                style: {
                                    theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
                                }
                            }
                        }}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardValidation;
