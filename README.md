# LIG-Team Chatbot Project (Frontend)

<div align="center">
  <p>A high-performance, premium frontend interface for the LIG-Team Chatbot Project.</p>
</div>

## 🌟 Overview

This is the frontend application for the LIG-Team Chatbot Project, built with **React**, **Vite**, and **Tailwind CSS**. It provides a sophisticated workspace experience featuring advanced document management (RAG architecture), real-time interactive Q&A, and extensive user personalization through a premium, animation-rich interface.

## ✨ Key Features

- **🎨 Premium Workspace Experience**: Highly personalized user environment featuring a robust **10-theme color engine** and a **7-font typography system**.
- **💬 Intelligent Chat Interface**: Real-time conversational UI with reliable chat history persistence across login/logout sessions.
- **📄 Advanced Document Management**: Includes drag-and-drop capabilities, an interactive document preview widget, and seamless integration with the backend RAG (Retrieval-Augmented Generation) architecture.
- **✨ High-Impact Animations & UI**:
  - Scroll-triggered QA animations with direction-aware sliding effects.
  - Premium aesthetic featuring a Bento Grid "About Us" section and a responsive 12-column feature showcase.
  - Advanced micro-interactions utilizing custom elements like `LetterGlitch`, `FlowingMenu`, and `ScrollFloat`.
  - Sleek glassmorphism aesthetics and deep dark mode integration.
- **🔐 Authentication**: Secure user login with persistent state and seamless session management.

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations & Scrolling**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/), [React Spring](https://react-spring.dev/), [Lenis](https://lenis.darkroom.engineering/)

---

## 🚀 Getting Started

Follow these steps to run the frontend application locally:

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository** and navigate to the frontend directory.
2. **Install the dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and navigate to the local URL (usually `http://localhost:5173`).

---

## 🔌 Backend Integration

This frontend works in conjunction with a dedicated backend service. The backend handles the core RAG architecture, LLM integration, user authentication, and data persistence.

> **Note:** The backend component is maintained and developed by **Ahmed**. Please refer to Ahmed's GitHub repository for the backend configuration, API routes, and necessary environment variables (`.env`).

---

## 👥 Contributors

- **Frontend Architecture & UI/UX**: Mohamed Islem (GitHub: [Mohamed-Islem-2005](https://github.com/Mohamed-Islem-2005))
- **Backend Architecture & AI Integration**: Ahmed
