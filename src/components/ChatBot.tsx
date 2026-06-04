import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, ArrowLeft, Sparkles, Smile, Wind, RefreshCw, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getChatResponse, ChatMessage } from '../services/gemini';

interface ChatBotProps {
  onBack: () => void;
}

const MOODS = [
  { emoji: '😊', label: 'Happy', value: 'happy', color: 'from-amber-400 to-orange-500' },
  { emoji: '😔', label: 'Sad', value: 'sad', color: 'from-blue-400 to-indigo-600' },
  { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'from-purple-400 to-pink-500' },
  { emoji: '😡', label: 'Angry', value: 'angry', color: 'from-red-500 to-rose-700' },
  { emoji: '😫', label: 'Tired', value: 'tired', color: 'from-slate-400 to-slate-700' },
  { emoji: '🥺', label: 'Lonely', value: 'lonely', color: 'from-teal-400 to-emerald-600' },
];

export default function ChatBot({ onBack }: ChatBotProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out'>('inhale');
  const [breathingTimer, setBreathingTimer] = useState(4);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from Monica
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      role: 'assistant',
      content: `Hi there! I'm Monica, your wellness companion. I'm here to listen, offer emotional support, or guide you through a quick breathing exercise. How are you feeling today? 💜`
    };
    setMessages([welcomeMsg]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Breathing exercise loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showBreathing) {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev <= 1) {
            setBreathingPhase((currentPhase) => {
              switch (currentPhase) {
                case 'inhale': return 'hold-in';
                case 'hold-in': return 'exhale';
                case 'exhale': return 'hold-out';
                case 'hold-out': return 'inhale';
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showBreathing]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const apiMessages = [...messages, userMessage];
      const botResponse = await getChatResponse(apiMessages, selectedMood);
      
      const botMessage: ChatMessage = {
        role: 'assistant',
        content: botResponse
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `I'm having some trouble connecting, but I'm here for you. Take a deep breath. 💜`
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Add mood check-in to system or chat
    const checkinMessage: ChatMessage = {
      role: 'user',
      content: `I am feeling ${mood} today.`
    };
    setMessages((prev) => [...prev, checkinMessage]);
    setIsTyping(true);
    
    getChatResponse([checkinMessage], mood).then((res) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: res }]);
      setIsTyping(false);
    });
  };

  const resetChat = () => {
    setSelectedMood(undefined);
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I've refreshed our conversation. How can I support you right now? 🌸`
      }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-mint-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-all duration-500">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-b border-purple-100 dark:border-purple-900">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/80 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-coral-500 flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white fill-current animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
              Monica <Sparkles className="w-4 h-4 text-purple-500" />
            </h2>
            <p className="text-xs text-green-500 font-medium">Online & ready to listen</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBreathing(!showBreathing)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow transition-all duration-300 ${
              showBreathing 
                ? 'bg-purple-600 text-white animate-bounce' 
                : 'bg-white/80 dark:bg-gray-800/80 text-purple-600 dark:text-purple-300 hover:bg-purple-50'
            }`}
          >
            <Wind className="w-4 h-4" />
            {showBreathing ? 'Close Exercise' : 'Calm Breathing'}
          </button>
          <button
            onClick={resetChat}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 transition-all"
            title="Reset Conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main chat window split with breathing exercise if active */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Breathing Exercise Side panel */}
        {showBreathing && (
          <div className="w-full md:w-80 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-b md:border-b-0 md:border-r border-purple-100 dark:border-purple-900 p-6 flex flex-col items-center justify-center transition-all duration-500">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Box Breathing</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-8">
              Follow the visual guide to slow your heart rate and ease anxiety.
            </p>

            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Pulsing Circle */}
              <div 
                className={`absolute rounded-full bg-purple-500/20 border-2 border-purple-400 transition-all duration-1000 ease-in-out ${
                  breathingPhase === 'inhale' ? 'scale-125 opacity-100' :
                  breathingPhase === 'hold-in' ? 'scale-125 opacity-70' :
                  breathingPhase === 'exhale' ? 'scale-75 opacity-100' : 'scale-75 opacity-40'
                }`}
                style={{ width: '100%', height: '100%' }}
              />
              {/* Core Text Indicator */}
              <div className="z-10 text-center">
                <span className="text-xl font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  {breathingPhase.replace('-', ' ')}
                </span>
                <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                  {breathingTimer}s
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm font-medium text-purple-800 dark:text-purple-300">
              {breathingPhase === 'inhale' && 'Breathe in slowly... 🌬️'}
              {breathingPhase === 'hold-in' && 'Hold that breath... 🛑'}
              {breathingPhase === 'exhale' && 'Release it gently... 🍃'}
              {breathingPhase === 'hold-out' && 'Rest and wait... 🧘'}
            </div>
          </div>
        )}

        {/* Conversation Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {/* Mood selector prompt if no messages other than welcome */}
            {messages.length === 1 && !selectedMood && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-100 dark:border-purple-900 shadow-md max-w-xl mx-auto my-4">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Smile className="w-5 h-5 text-purple-500" /> Share your current mood with Monica:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodSelect(mood.label)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br ${mood.color} text-white shadow hover:scale-105 transition-transform duration-200`}
                    >
                      <span className="text-2xl mb-1">{mood.emoji}</span>
                      <span className="text-xs font-semibold">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-start max-w-[80%] space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${
                      isUser 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-gradient-to-br from-purple-500 to-coral-500 text-white'
                    }`}>
                      {isUser ? (
                        user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                        ) : (
                          <User className="w-4 h-4" />
                        )
                      ) : (
                        <Heart className="w-4 h-4 fill-current" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl shadow-sm leading-relaxed text-sm ${
                      isUser
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-150 border border-purple-50/50 dark:border-gray-700 rounded-tl-none'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-coral-500 flex items-center justify-center shadow-md text-white">
                    <Heart className="w-4 h-4 fill-current animate-pulse" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-purple-50/50 dark:border-gray-700 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={handleSendMessage}
            className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-t border-purple-100 dark:border-purple-900 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk to Monica about anything..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 rounded-full border border-purple-100 dark:border-purple-900 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="px-6 py-2 bg-white/30 dark:bg-gray-800/30 text-[10px] text-center text-gray-500 dark:text-gray-400 border-t border-purple-50/50 dark:border-gray-700/50">
            Disclaimer: Monica is an AI wellness companion, not a licensed medical professional. Suggestions or information provided are not substitutes for professional medical advice or treatment. If you are experiencing a crisis or medical emergency, please contact your local emergency services immediately.
          </div>
        </div>
      </div>
    </div>
  );
}