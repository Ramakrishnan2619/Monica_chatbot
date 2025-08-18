import React, { useState } from 'react';
import { ArrowLeft, Search, Phone, Play, BookOpen, AlertTriangle, Heart, Zap, Droplet, Flame } from 'lucide-react';

interface FirstAidProps {
  onBack: () => void;
}

interface EmergencyCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  scenarios: string[];
  priority: 'high' | 'medium' | 'low';
}

const emergencyCategories: EmergencyCategory[] = [
  {
    id: 'cpr',
    title: 'CPR & Cardiac',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500',
    scenarios: ['Heart Attack', 'Cardiac Arrest', 'CPR Steps', 'AED Usage'],
    priority: 'high'
  },
  {
    id: 'bleeding',
    title: 'Bleeding & Cuts',
    icon: <Droplet className="w-6 h-6" />,
    color: 'from-red-400 to-coral-500',
    scenarios: ['Severe Bleeding', 'Deep Cuts', 'Pressure Points', 'Tourniquets'],
    priority: 'high'
  },
  {
    id: 'burns',
    title: 'Burns & Heat',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-orange-500 to-yellow-500',
    scenarios: ['First-degree Burns', 'Chemical Burns', 'Electrical Burns', 'Heat Stroke'],
    priority: 'medium'
  },
  {
    id: 'choking',
    title: 'Choking & Airways',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-500',
    scenarios: ['Adult Choking', 'Child Choking', 'Infant Choking', 'Heimlich Maneuver'],
    priority: 'high'
  },
  {
    id: 'fractures',
    title: 'Fractures & Sprains',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    scenarios: ['Broken Bones', 'Sprains', 'Dislocations', 'Splinting'],
    priority: 'medium'
  },
  {
    id: 'allergic',
    title: 'Allergic Reactions',
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'from-green-500 to-mint-500',
    scenarios: ['Anaphylaxis', 'Food Allergies', 'Insect Stings', 'EpiPen Usage'],
    priority: 'high'
  }
];

const quickActions = [
  { title: 'Call 911', action: 'call-911', color: 'bg-red-500', icon: <Phone className="w-5 h-5" /> },
  { title: 'Poison Control', action: 'poison', color: 'bg-purple-500', icon: <AlertTriangle className="w-5 h-5" /> },
  { title: 'Start CPR Guide', action: 'cpr-guide', color: 'bg-coral-500', icon: <Heart className="w-5 h-5" /> }
];

export default function FirstAid({ onBack }: FirstAidProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isMonicarSpeaking, setIsMonicaSpeaking] = useState(false);
  const [speakingDots, setSpeakingDots] = useState('');

  // Emergency detection
  React.useEffect(() => {
    const emergencyKeywords = ['bleeding', 'accident', 'burn', 'choking', 'unconscious', 'emergency'];
    const hasEmergencyKeyword = emergencyKeywords.some(keyword => 
      searchQuery.toLowerCase().includes(keyword)
    );
    setIsEmergencyMode(hasEmergencyKeyword);
  }, [searchQuery]);

  // Speaking dots animation
  React.useEffect(() => {
    if (isMonicarSpeaking) {
      const interval = setInterval(() => {
        setSpeakingDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isMonicarSpeaking]);

  const filteredCategories = emergencyCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.scenarios.some(scenario => 
      scenario.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Simulate Monica speaking when providing first aid guidance
    setIsMonicaSpeaking(true);
    setTimeout(() => {
      setIsMonicaSpeaking(false);
    }, 3000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'call-911':
        if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
          window.open('tel:911');
        } else {
          alert('Emergency: Call 911 immediately');
        }
        break;
      case 'poison':
        if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
          window.open('tel:18002221222');
        } else {
          alert('Poison Control: 1-800-222-1222');
        }
        break;
      case 'cpr-guide':
        setSelectedCategory('cpr');
        break;
    }
  };

  if (selectedCategory) {
    const category = emergencyCategories.find(c => c.id === selectedCategory);
    return (
      <FirstAidDetail 
        category={category!} 
        onBack={() => setSelectedCategory(null)} 
        isMonicarSpeaking={isMonicarSpeaking}
        speakingDots={speakingDots}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-orange-25 to-mint-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-b border-white/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Emergency First Aid</h1>
            <p className="text-sm text-coral-600 dark:text-coral-400">Quick help when you need it most</p>
          </div>
        </div>
        
        {isEmergencyMode && (
          <div className="animate-pulse">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Emergency Mode
            </span>
          </div>
        )}
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for emergency help (e.g., 'bleeding', 'choking')"
            className={`w-full pl-10 pr-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
              isEmergencyMode
                ? 'border-red-400 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                : 'border-transparent bg-white/50 dark:bg-gray-700/50 focus:border-coral-400'
            } focus:outline-none backdrop-blur-lg`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Common searches:</p>
            <div className="flex flex-wrap gap-2">
              {['CPR', 'bleeding', 'choking', 'burns', 'allergic reaction', 'fracture'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 bg-coral-100 dark:bg-coral-800/50 text-coral-700 dark:text-coral-300 rounded-full text-sm hover:bg-coral-200 dark:hover:bg-coral-700/50 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Emergency Actions</h2>
        <div className="flex space-x-3 overflow-x-auto">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 ${action.color} text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              {action.icon}
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Categories */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">First Aid Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                category.priority === 'high' && isEmergencyMode ? 'ring-2 ring-red-400' : ''
              }`}
            >
              {/* Glassmorphic background */}
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl"></div>
              
              {/* Priority indicator */}
              {category.priority === 'high' && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200">
                    High Priority
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.scenarios.slice(0, 3).map((scenario, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      {scenario}
                    </div>
                  ))}
                  {category.scenarios.length > 3 && (
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      +{category.scenarios.length - 3} more scenarios
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Tips */}
      <div className="px-4 pb-8">
        <div className="bg-gradient-to-r from-coral-100 to-orange-100 dark:from-coral-900/30 dark:to-orange-900/30 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">⚡ Quick Emergency Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Stay Calm</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Take a deep breath and assess the situation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Call for Help</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Don't hesitate to call 911 in serious situations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Follow Steps</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Follow first aid steps carefully and completely</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Monitor Patient</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep watching the person until help arrives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Quick Access */}
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border-l-4 border-red-400">
          <h4 className="text-lg font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Emergency Contacts
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleQuickAction('call-911')}
              className="flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>911 - Emergency</span>
            </button>
            <button
              onClick={() => handleQuickAction('poison')}
              className="flex items-center justify-center space-x-2 p-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Poison Control</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
                  window.open('tel:988');
                } else {
                  alert('Crisis Lifeline: 988');
                }
              }}
            >
              <Heart className="w-4 h-4" />
              <span>988 - Crisis Line</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Monica Speaking Animation for First Aid */}
      {isMonicarSpeaking && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            {/* Speaking Circle Animation */}
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral-400/30 to-orange-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 to-coral-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main speaking circle */}
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-coral-500 to-orange-500 flex items-center justify-center shadow-lg animate-speaking-pulse">
                {/* Inner waveform animation */}
                <div className="flex items-center justify-center space-x-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-white rounded-full animate-wave"
                      style={{
                        height: '6px',
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral-500/50 to-orange-500/50 blur-md animate-glow"></div>
              </div>
            </div>
            
            {/* Speaking text */}
            <span className="text-sm font-medium text-coral-600 dark:text-coral-400">
              Monica is guiding you{speakingDots}
            </span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes speaking-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 107, 107, 0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(255, 107, 107, 0.5); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(1); }
          20% { transform: scaleY(1.5); }
        }
        .animate-speaking-pulse { animation: speaking-pulse 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-wave { animation: wave 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// First Aid Detail Component
function FirstAidDetail({ 
  category, 
  onBack, 
  isMonicarSpeaking, 
  speakingDots 
}: { 
  category: EmergencyCategory; 
  onBack: () => void;
  isMonicarSpeaking: boolean;
  speakingDots: string;
}) {
  const [selectedScenario, setSelectedScenario] = useState(category.scenarios[0]);

  const getScenarioSteps = (scenario: string): string[] => {
    // In a real app, this would come from a database
    const stepGuides: { [key: string]: string[] } = {
      'Heart Attack': [
        'Call 911 immediately',
        'Help person sit down and stay calm',
        'Give aspirin if available and no allergies',
        'Loosen tight clothing',
        'Be prepared to perform CPR if person becomes unconscious'
      ],
      'CPR Steps': [
        'Check for responsiveness - tap shoulders and shout "Are you okay?"',
        'Call 911 and get an AED if available',
        'Place person on firm, flat surface',
        'Tilt head back, lift chin to open airway',
        'Place heel of hand on center of chest between nipples',
        'Push hard and fast at least 2 inches deep at 100-120 compressions per minute',
        'Allow complete chest recoil between compressions',
        'Continue until emergency services arrive'
      ],
      'Severe Bleeding': [
        'Ensure scene safety and use personal protective equipment',
        'Apply direct pressure to wound with clean cloth or gauze',
        'Maintain pressure and add more layers if blood soaks through',
        'Elevate injured area above heart level if possible',
        'Apply pressure bandage to maintain pressure',
        'Check for signs of shock and treat accordingly',
        'Get medical help immediately'
      ],
      'Adult Choking': [
        'Ask "Are you choking?" If person can speak or cough, encourage coughing',
        'If person cannot speak, breathe, or make sound, act quickly',
        'Stand behind person and wrap arms around waist',
        'Make a fist with one hand, place above navel but below ribcage',
        'Grasp fist with other hand and give quick upward thrusts',
        'Continue until object is expelled or person becomes unconscious',
        'If unconscious, lower to ground and begin CPR'
      ]
    };

    return stepGuides[scenario] || ['Detailed steps for this scenario are being updated. Please consult emergency services.'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-orange-25 to-mint-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-b border-white/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h1>
              <p className="text-sm text-coral-600 dark:text-coral-400">Step-by-step guidance</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
              window.open('tel:911');
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call 911</span>
        </button>
      </header>

      {/* Scenario Selector */}
      <div className="p-4 border-b border-white/20">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Select Scenario</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {category.scenarios.map((scenario) => (
            <button
              key={scenario}
              onClick={() => setSelectedScenario(scenario)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedScenario === scenario
                  ? 'bg-gradient-to-r from-coral-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-coral-100 dark:hover:bg-coral-800'
              }`}
            >
              {scenario}
            </button>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="p-4">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedScenario}</h3>
            <button className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-xl text-sm font-medium">
              <Play className="w-4 h-4" />
              <span>Watch Video</span>
            </button>
          </div>

          <div className="space-y-4">
            {getScenarioSteps(selectedScenario).map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white font-medium leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-xl">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300">Important</h4>
            </div>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              These steps are for guidance only. Always call emergency services for serious injuries. If you're unsure about the severity, err on the side of caution and seek professional medical help.
            </p>
          </div>
        </div>
      </div>
      
      {/* Monica Speaking Animation for First Aid Detail */}
      {isMonicarSpeaking && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            {/* Speaking Circle Animation */}
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral-400/30 to-orange-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 to-coral-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main speaking circle */}
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-coral-500 to-orange-500 flex items-center justify-center shadow-lg animate-speaking-pulse">
                {/* Inner waveform animation */}
                <div className="flex items-center justify-center space-x-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-white rounded-full animate-wave"
                      style={{
                        height: '6px',
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral-500/50 to-orange-500/50 blur-md animate-glow"></div>
              </div>
            </div>
            
            {/* Speaking text */}
            <span className="text-sm font-medium text-coral-600 dark:text-coral-400">
              Monica is guiding you{speakingDots}
            </span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes speaking-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 107, 107, 0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(255, 107, 107, 0.5); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(1); }
          20% { transform: scaleY(1.5); }
        }
        .animate-speaking-pulse { animation: speaking-pulse 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-wave { animation: wave 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}