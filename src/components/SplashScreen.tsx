import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-mint-100 dark:from-purple-900 dark:via-pink-900 dark:to-mint-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 dark:from-purple-600/20 dark:to-pink-600/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Logo with heartbeat animation */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Stethoscope circle */}
            <div className="w-32 h-32 rounded-full border-4 border-coral-500 dark:border-coral-400 flex items-center justify-center animate-pulse">
              {/* Heart with chat bubble effect */}
              <div className="relative">
                <Heart 
                  className="w-16 h-16 text-coral-500 dark:text-coral-400 fill-current animate-heartbeat" 
                />
                {/* Chat bubble indicator */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 dark:bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full border-4 border-coral-300/50 dark:border-coral-500/30 animate-ping"></div>
          </div>
        </div>

        {/* App name and tagline */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-coral-500 to-mint-600 dark:from-purple-400 dark:via-coral-400 dark:to-mint-400 bg-clip-text text-transparent mb-2 animate-fade-in">
            Monica
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium animate-fade-in-delay">
            A Friend. A First Aider.
          </p>
        </div>

        {/* Loading animation */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-coral-500 rounded-full animate-wave"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 ml-4 animate-pulse">
              Loading your companion...
            </span>
          </div>
        )}
        
        {/* Loading progress indicator */}
        {isLoading && (
          <div className="mt-8 w-64 mx-auto">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-coral-500 to-mint-500 rounded-full animate-loading-bar"></div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(-15px) rotate(240deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 40%, 100% { transform: translateY(0); }
          20% { transform: translateY(-10px); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out 0.5s both; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out 1s both; }
        .animate-wave { animation: wave 1.4s ease-in-out infinite; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}