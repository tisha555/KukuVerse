import React, { useState, useEffect } from 'react';
import { Headphones, BookOpen, Brain, Sparkles, Play, Pause, Volume2, Sun, Moon } from 'lucide-react';

type ContentType = 'story' | 'motivation' | 'meditation' | 'fiction';
type Mood = 'happy' | 'relaxed' | 'energetic' | 'focused';

interface ContentParams {
  type: ContentType;
  mood: Mood;
  duration: number;
  title: string;
}

function App() {
  const [selectedType, setSelectedType] = useState<ContentType>('story');
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const contentTypes = [
    { type: 'story' as ContentType, icon: BookOpen, label: 'Stories' },
    { type: 'motivation' as ContentType, icon: Sparkles, label: 'Motivation' },
    { type: 'meditation' as ContentType, icon: Brain, label: 'Meditation' },
    { type: 'fiction' as ContentType, icon: Headphones, label: 'Fiction' },
  ];

  const moods = [
    { value: 'happy' as Mood, label: 'Happy', color: 'bg-yellow-500' },
    { value: 'relaxed' as Mood, label: 'Relaxed', color: 'bg-blue-500' },
    { value: 'energetic' as Mood, label: 'Energetic', color: 'bg-red-500' },
    { value: 'focused' as Mood, label: 'Focused', color: 'bg-purple-500' },
  ];

  const handleGenerate = () => {
    // Placeholder for AI generation logic
    console.log('Generating content with:', {
      type: selectedType,
      mood: selectedMood,
      duration,
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${isDark 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white' 
        : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <button
            onClick={() => setIsDark(!isDark)}
            className="absolute right-4 top-0 p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            KukuVerse
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your AI-Powered Audio Content Universe
          </p>
        </header>

        <div className={`max-w-4xl mx-auto ${isDark ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-lg rounded-2xl p-8 shadow-2xl`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {contentTypes.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-4 rounded-xl transition-all ${
                  selectedType === type
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : `${isDark ? 'bg-white/5 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'}`
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <span className="block text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg mb-4">Select Mood</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setSelectedMood(value)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedMood === value
                      ? `${color} text-white shadow-lg scale-105`
                      : `${isDark ? 'bg-white/5 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'}`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg mb-4">Duration (minutes)</h3>
            <input
              type="range"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                isDark ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            />
            <div className="text-center mt-2">{duration} minutes</div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Content
            </button>
          </div>

          <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white/40'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <div>
                  <h3 className="font-semibold">Your Generated Content</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI-Generated • {duration} minutes
                  </p>
                </div>
              </div>
              <Volume2 className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;