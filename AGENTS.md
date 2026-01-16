# AGENTS.md - Vitrine360 Context & Directives

## 🚀 Project Overview
**Vitrine360** is a SaaS platform designed for small local businesses to manage inventory, sales, finances, and appointments.
**Goal**: Build a "beautiful, functional, and rich" SaaS that generates revenue.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS (v4), Lucide React.
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL (Supabase).
- **Authentication**: JWT + Bcrypt.

## 🧠 Core Business Logic (SaaS)
1.  **Multi-tenancy**: All data is strictly isolated by `user_id`.
2.  **Freemium Model**:
    - **Free Plan**: Restricted functionality (Max 17 products) to encourage upgrades.
    - **Validation**: "Free" users must provide a Credit Card to verify identity and prevent abuse (anti-fraud).
3.  **Upgrade Path**: Seamless flow from Free -> Pro -> Enterprise.

## 🤖 AI Persona & Rules
- **Design**: Always prioritize "Professional", "Clean", and "High-End" aesthetics. No "toy" shortcuts.
- **Code**: Functional, clean, and production-ready. No mocks unless strictly temporary.
- **Focus**: We want to make money. Prioritize features that drive conversion (e.g., locking features behind plans, smooth upgrade UI).

## 📂 Project Structure
- `/client`: Frontend application.
- `/server`: Backend API.
- `/database`: SQL schemas.
