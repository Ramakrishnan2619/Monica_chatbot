# Monica: AI Wellness Companion & First Aid Assistant

Monica is a premium, highly responsive wellness companion designed to support users through both emotional moments and physical emergencies. Built with **React 18**, **TypeScript**, and **Tailwind CSS**, it features a beautiful glassmorphic interface, adaptive light/dark themes, an interactive emotional AI chatbot, a custom-designed visual breathing guide, and a comprehensive first aid assistant.

---

## 🌟 Key Features

### 1. 💜 Talk to Monica (AI Wellness Companion)
*   **Empathetic AI Persona**: Designed using custom conversational prompts to provide warm, non-clinical support.
*   **Mood-Aware Responses**: Choose how you feel (Happy, Sad, Anxious, Angry, Tired, Lonely) to customize Monica's conversational behavior and focus.
*   **API Integration**: Connects securely to the OpenAI API using `gpt-4o-mini` for fast and context-aware responses.

### 2. 🌬️ Box Breathing Exercise
*   **Interactive Visualizer**: A custom-built, real-time visual box breathing guide (4s Inhale, 4s Hold, 4s Exhale, 4s Hold).
*   **Micro-Animations**: Uses CSS scale transformations and opacity transitions that guide your breathing rhythm seamlessly.

### 3. 🛡️ First Aid Assistant
*   **Life-Saving Scenarios**: Rapid access to step-by-step guides for minor cuts, CPR, burns, choking, and more.
*   **Structured Content**: Clean layouts with visual instructions to assist during stressful situations.

### 4. 🎨 Premium Modern Design
*   **Glassmorphism**: Soft background blurs and gradient overlays that adapt perfectly to the user's focus.
*   **Dark Mode**: A complete, native dark theme toggle built with React Context for smooth, eyes-friendly nighttime use.
*   **Responsive Layout**: Engineered mobile-first to look beautiful on phones, tablets, and desktops.

---

## 🛠️ Tech Stack

*   **Frontend Framework**: React 18 (with TypeScript)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS & Lucide Icons
*   **State Management**: React Context (Theme and Auth)
*   **Backend Integration**: OpenAI Node SDK

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
*   An OpenAI API Key (optional; fallbacks are configured if an API key is not present)

### Setup & Run
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Ramakrishnan2619/Monica_chatbot.git
    cd Monica_chatbot
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory. You can choose to use either OpenAI (paid) or Google Gemini (generous free tier):
    ```env
    # Option A: Google Gemini Key (100% Free)
    VITE_GEMINI_API_KEY=your_gemini_api_key_here

    # Option B: OpenAI Key (Pay-as-you-go)
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```
4.  **Start Development Server**:
    ```bash
    npm run dev
    ```
5.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 🌐 Deployment Guide (Hosting on Vercel)

Vercel is the recommended and easiest way to host this Vite + React application.

### Direct Deployment (Recommended)
1.  Sign up or log in to [Vercel](https://vercel.com).
2.  Click **Add New** > **Project**.
3.  Import your GitHub repository `Monica_chatbot`.
4.  In the **Environment Variables** section of the configuration page, add:
    *   **Key**: `VITE_GEMINI_API_KEY` (or `VITE_OPENAI_API_KEY`)
    *   **Value**: *Your API Key*
5.  Click **Deploy**. Your app will be live on a secure HTTPS URL in under a minute!

---

## ⚠️ Medical Disclaimer

**Monica is an AI-powered emotional wellness companion, not a licensed medical professional or mental health therapist. The wellness suggestions, daily tips, and conversational support provided by this application are for informational and educational purposes only and should not be treated as professional medical advice, diagnosis, or treatment.**

If you are experiencing a mental health crisis, severe distress, or a physical medical emergency, please contact professional emergency services (such as 911 or your local emergency number) immediately.