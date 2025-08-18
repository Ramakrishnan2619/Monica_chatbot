import React from 'react';
import { Heart, Shield, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onNavigate: (view: 'chat' | 'firstaid') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-mint-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-all duration-500">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-coral-500 flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white fill-current animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-coral-500 bg-clip-text text-transparent">
              Monica
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your wellness companion</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.name || 'User'}
            </span>
            <button
              onClick={logout}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Hello, {user?.name || 'Friend'} 👋
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm here to support you through both emotional moments and emergency situations. 
            How can I help you today?
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Emotional Support Card */}
          <div 
            onClick={() => onNavigate('chat')}
            className="group relative overflow-hidden rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
          >
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-coral-400/20 backdrop-blur-lg border border-white/20 rounded-3xl"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 group-hover:scale-150 transition-transform duration-1000"
                  style={{
                    width: 80 + i * 40,
                    height: 80 + i * 40,
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Talk to Monica</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Emotional Support</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Need someone to listen? I'm here with a warm heart and understanding ear. 
                Let's chat about what's on your mind, track your mood, or try some calming exercises together.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Mood Tracking
                </span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-800/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">
                  Breathing Exercises
                </span>
                <span className="px-3 py-1 bg-coral-100 dark:bg-coral-800/50 text-coral-700 dark:text-coral-300 rounded-full text-sm font-medium">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>

          {/* First Aid Card */}
          <div 
            onClick={() => onNavigate('firstaid')}
            className="group relative overflow-hidden rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
          >
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral-400/20 via-orange-400/20 to-mint-400/20 backdrop-blur-lg border border-white/20 rounded-3xl"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-coral-300/30 to-mint-300/30 group-hover:scale-150 transition-transform duration-1000"
                  style={{
                    width: 80 + i * 40,
                    height: 80 + i * 40,
                    right: `${20 + i * 30}%`,
                    bottom: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Emergency Help</h3>
                  <p className="text-coral-600 dark:text-coral-400 font-medium">First Aid Assistant</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Quick access to life-saving first aid guidance. From minor cuts to emergency situations, 
                get step-by-step instructions with videos and clear illustrations.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-coral-100 dark:bg-coral-800/50 text-coral-700 dark:text-coral-300 rounded-full text-sm font-medium">
                  CPR Guide
                </span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-800/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                  Emergency Calls
                </span>
                <span className="px-3 py-1 bg-mint-100 dark:bg-mint-800/50 text-mint-700 dark:text-mint-300 rounded-full text-sm font-medium">
                  Video Guides
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
            You're not alone in this journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Always Available</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-coral-600 dark:text-coral-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">First Aid Scenarios</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-mint-600 dark:text-mint-400 mb-2">∞</div>
              <div className="text-gray-600 dark:text-gray-400">Compassionate Support</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Your Wellness Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">Recent Conversations</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Talked about stress management - 2 hours ago</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Completed breathing exercise - Yesterday</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span>Mood check-in: Feeling better - 2 days ago</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-coral-500 to-orange-500 flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">Safety Knowledge</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <span>Reviewed CPR steps - Last week</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  <span>Learned about burn treatment - 2 weeks ago</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-mint-400 rounded-full mr-3"></div>
                  <span>Emergency contacts updated - Last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Daily Wellness Tip */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-purple-100/80 via-pink-100/80 to-mint-100/80 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-mint-900/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-mint-500 flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-white fill-current animate-pulse" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">Daily Wellness Tip</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">From Monica with love</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {isLoadingTip ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                  Monica is preparing your daily tip...
                </span>
              ) : (
                `"${dailyTip}"`
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}