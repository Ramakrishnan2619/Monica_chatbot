import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const motivationalQuotes = [
  "You matter. Your peace matters.",
  "Let's breathe together today.",
  "Every small step counts.",
  "You're stronger than you think.",
  "Healing begins with self-compassion."
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [currentQuote, setCurrentQuote] = useState(0);
  const { login, signup, loginWithGoogle } = useAuth();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
    } catch (error) {
      console.log('Auth error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log('Google auth error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-mint-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `linear-gradient(45deg, ${['#A389D4', '#FF6B6B', '#C3FBD8', '#A1CFF0'][Math.floor(Math.random() * 4)]}, transparent)`,
              animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-coral-500 mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-coral-500 bg-clip-text text-transparent">
            Welcome to Monica
          </h1>
        </div>

        {/* Auth Form */}
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-coral-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-coral-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-transparent bg-white/50 dark:bg-gray-700/50 focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-transparent bg-white/50 dark:bg-gray-700/50 focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-transparent bg-white/50 dark:bg-gray-700/50 focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 via-coral-500 to-mint-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isLogin ? 'Welcome Back' : 'Join Monica'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/70 dark:bg-gray-800/70 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:border-purple-400 transition-all duration-300 hover:shadow-lg"
            >
              Continue with Google
            </button>

            {/* Privacy Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By continuing, you agree to Monica's{' '}
                <button className="text-purple-600 dark:text-purple-400 hover:underline">
                  Privacy Policy
                </button>{' '}
                and{' '}
                <button className="text-purple-600 dark:text-purple-400 hover:underline">
                  Terms of Service
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300 italic animate-fade-in-out">
            "{motivationalQuotes[currentQuote]}"
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out { animation: fade-in-out 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}