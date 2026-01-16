# PERFORMANCE.md - Roadmap to Millions 🚀

This document tracks our goals, milestones, and performance metrics to ensure Vitrine360 becomes a profitable SaaS.

## 🎯 Business Goals (The "Money" Part)
- [x] **Stop Free Tier Abuse**: Implement mandatory Credit Card validation for the Free Trial.
    - *Why*: Verifies user is real, prevents 1000 fake accounts, makes upgrade easier later.
- [x] **Conversion Funnel**: Create a seamless "Upgrade to Pro" flow inside the dashboard.
- [ ] **Churn Reduction**: Offer "Down-sell" or discounts before a user cancels.

## 📦 Plan Definition & Limits
| Feature | **Iniciante (Free)** | **Profissional (R$ 49)** | **Empresarial (R$ 99)** |
| :--- | :--- | :--- | :--- |
| **Produtos** | **Max 17** | Ilimitado | Ilimitado + API |
| **Vendas** | 50/mês | Ilimitado | Ilimitado |
| **Usuários** | 1 | 1 | Múltiplos |
| **Suporte** | Email | Prioritário | Gerente Dedicado |

## 🛠 Technical Roadmap (Next Steps)
1.  **Payment Integration (Mercado Pago)**
    - [x] Create subscription plans in the gateway (Using Preferences).
    - [ ] Implement webhook to handle recurring payments (Infrastructure ready, needs testing).
    - [x] Implement strict "Card Validation" (Anti-fraud verification via Payment Brick).

2.  **Feature Gating (The "Lock")**
    - [ ] Backend: Middleware to check plan limits (e.g., `if (products > 17 && plan == 'free') throw Error`).
    - [ ] Frontend: UI indicators showing usage (e.g., "15/17 Products Used").

3.  **Optimization**
    - [ ] Database indexing for faster queries as user base grows.
    - [ ] Cache frequent requests (Redis or similar).

4.  **Security**
    - [ ] Rate limiting (prevents DDoS).
    - [ ] Input validation (Zod/Joi).

## 📈 Success Metrics (KPIs)
- **CAC (Cost to Acquire Customer)**: Keep low.
- **LTV (Lifetime Value)**: Increase via upgrades.
- **MRR (Monthly Recurring Revenue)**: The main goal!
