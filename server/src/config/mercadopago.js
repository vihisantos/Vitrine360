const { MercadoPagoConfig, Payment, Preference, Customer, Card } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

module.exports = {
    client,
    Payment,
    Preference,
    Customer,
    Card
};
