import React, { useState, useEffect } from 'react';
import { Plus, Search, ShoppingCart, Trash2, History, Package, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Sales = () => {
    const { user } = useAuth();
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [activeTab, setActiveTab] = useState('pos'); // 'pos' or 'history'

    const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${user.token}` };
        try {
            const [salesRes, productsRes] = await Promise.all([
                fetch('http://localhost:5000/api/sales', { headers }),
                fetch('http://localhost:5000/api/products', { headers })
            ]);
            setSales(await salesRes.json());
            setProducts(await productsRes.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.token) fetchData();
    }, [user]);

    if (loading) return (
        <div className="flex justify-center items-center h-full min-h-[400px]">
            <Loader />
        </div>
    );

    const addToCart = (product) => {
        if (product.stock <= 0) return alert('Produto sem estoque!');

        setCart(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    alert('Limite de estoque atingido!');
                    return current;
                }
                return current.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(current => current.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(current => {
            return current.map(item => {
                if (item.id === productId) {
                    const newQty = item.quantity + delta;
                    if (newQty < 1) return item;
                    // Check stock
                    const product = products.find(p => p.id === productId);
                    if (newQty > product.stock) {
                        alert('Limite de estoque!');
                        return item;
                    }
                    return { ...item, quantity: newQty };
                }
                return item;
            });
        });
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            };

            // Process each item as a separate sale for now (Backend limitation usually handles single items per sale record based on current simple schema)
            // Ideally we'd have a 'Sale' parent and 'SaleItems' children, but adapting to current schema:

            for (const item of cart) {
                const total_price = item.price * item.quantity;
                await fetch('http://localhost:5000/api/sales', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        product_id: item.id,
                        quantity: item.quantity,
                        total_price
                    })
                });
            }

            setCart([]);
            fetchData();
            alert('Venda realizada com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao finalizar venda.');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">PDV - Ponto de Venda</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie vendas e histórico.</p>
                </div>
                <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('pos')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'pos' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                    >
                        Nova Venda
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                    >
                        Histórico
                    </button>
                </div>
            </div>

            {activeTab === 'pos' ? (
                <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
                    {/* Left: Product Grid */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50"
                                    placeholder="Buscar produto..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        className="group flex flex-col items-start text-left bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="w-full aspect-square bg-white dark:bg-gray-600 rounded-lg mb-3 overflow-hidden">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-500">
                                                    <Package size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white line-clamp-1">{product.name}</h4>
                                        <div className="flex justify-between items-center w-full mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-400 font-bold">R$ {Number(product.price).toFixed(2)}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{product.stock} un.</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Cart */}
                    <div className="w-full lg:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-indigo-500/5 border border-indigo-100 dark:border-gray-700 flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <ShoppingCart size={20} className="text-indigo-600" />
                                Carrinho Atual
                            </h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-50">
                                    <ShoppingCart size={48} />
                                    <p>Carrinho vazio</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl animate-scale-in">
                                        <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-lg shrink-0 overflow-hidden">
                                            {item.image_url && <img src={item.image_url} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</h4>
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">R$ {Number(item.price).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white dark:bg-gray-600 rounded-lg p-1 shadow-sm">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-indigo-600 text-xs font-bold">-</button>
                                            <span className="text-xs font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-indigo-600 text-xs font-bold">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-500 dark:text-gray-400">Total</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ {cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                            >
                                Finalizar Venda
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="p-6">Produto</th>
                                <th className="p-6">Qtd.</th>
                                <th className="p-6">Total</th>
                                <th className="p-6">Data</th>
                                <th className="p-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {sales.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500">Nenhuma venda registrada.</td>
                                </tr>
                            ) : (
                                sales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date)).map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="p-6 font-medium text-gray-900 dark:text-white">{sale.product_name}</td>
                                        <td className="p-6 text-gray-600 dark:text-gray-400">{sale.quantity}</td>
                                        <td className="p-6 text-indigo-600 dark:text-indigo-400 font-medium">R$ {Number(sale.total_price).toFixed(2)}</td>
                                        <td className="p-6 text-gray-500 dark:text-gray-400">
                                            {new Date(sale.sale_date).toLocaleDateString()} <span className="text-xs opacity-70 ml-1">{new Date(sale.sale_date).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="p-6">
                                            <button disabled className="px-3 py-1 bg-gray-100 text-gray-400 rounded-lg text-xs font-bold border border-gray-200 cursor-not-allowed" title="Em breve">
                                                Emitir Nota (Em breve)
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Sales;
