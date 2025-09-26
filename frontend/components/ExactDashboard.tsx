import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Wifi, 
  Plus, 
  MoreHorizontal, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  Power,
  Cloud,
  CloudRain,
  Calendar,
  Clock,
  Mic,
  Settings,
  Download,
  Upload,
  Monitor
} from 'lucide-react';

export function ExactDashboard() {
  const [audioLevels, setAudioLevels] = useState<number[]>([]);

  useEffect(() => {
    // Generate random audio visualization
    const generateAudioLevels = () => {
      const levels = Array.from({ length: 40 }, () => Math.random() * 60 + 20);
      setAudioLevels(levels);
    };

    generateAudioLevels();
    const interval = setInterval(generateAudioLevels, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white overflow-hidden">
      <style>{`
        @keyframes audioBar {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .audio-bar {
          animation: audioBar 0.5s ease-in-out infinite;
        }
        @keyframes ledSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .led-ring {
          animation: ledSpin 3s linear infinite;
        }
      `}</style>
      
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-72 bg-[#0e1017] p-6 flex flex-col">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
              <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                G
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium tracking-wide">GOOD EVENING</p>
              <h2 className="text-lg font-semibold">Guy Hawkins</h2>
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>

          {/* My Rooms Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4 tracking-wide">MY ROOMS</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Entrance */}
              <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">Entrance</p>
                <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
              </div>

              {/* Backyard */}
              <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">Backyard</p>
                <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
              </div>

              {/* My Workstation - Active */}
              <div className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-2xl p-4 relative shadow-lg shadow-purple-500/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">My Workstation</p>
                <MoreHorizontal className="w-4 h-4 text-white/70 absolute top-4 right-4" />
              </div>

              {/* Living Room */}
              <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">Living Room</p>
                <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
              </div>

              {/* Front Room */}
              <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">Front Room</p>
                <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
              </div>

              {/* Add New */}
              <div className="border-2 border-dashed border-[#7c3aed] rounded-2xl p-4 flex flex-col items-center justify-center min-h-[100px] hover:border-[#a855f7] hover:bg-[#7c3aed]/5 transition-colors">
                <Plus className="w-6 h-6 text-[#7c3aed] mb-2" />
                <p className="text-sm text-[#7c3aed] font-medium">Add new</p>
              </div>
            </div>
          </div>

          {/* Set Room Environment */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4 tracking-wide">SET ROOM ENVIRONMENT</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#1a1d26] rounded-xl p-3 flex flex-col items-center text-center hover:bg-[#1f232c] transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <Volume2 className="w-4 h-4" />
                </div>
                <p className="text-xs">Music Mode</p>
              </div>
              <div className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-xl p-3 flex flex-col items-center text-center shadow-lg shadow-purple-500/20 cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                  <Settings className="w-4 h-4" />
                </div>
                <p className="text-xs">Cool and Relax</p>
              </div>
              <div className="bg-[#1a1d26] rounded-xl p-3 flex flex-col items-center text-center hover:bg-[#1f232c] transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <Settings className="w-4 h-4" />
                </div>
                <p className="text-xs">Night Vision</p>
              </div>
              <div className="bg-[#1a1d26] rounded-xl p-3 flex flex-col items-center text-center hover:bg-[#1f232c] transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <Home className="w-4 h-4" />
                </div>
                <p className="text-xs">Smart Home</p>
              </div>
            </div>
          </div>

          {/* Voice Assistant */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-400 mb-4 tracking-wide">VOICE ASSISTANCE</h3>
            <div className="bg-[#1a1d26] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Hey Google,</p>
                  <p className="text-sm text-gray-400">turn off my bedroom's lamp</p>
                </div>
              </div>
              
              {/* Audio Visualization */}
              <div className="flex items-end justify-center gap-1 h-16">
                {audioLevels.map((level, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-[#7c3aed] to-[#a855f7] rounded-full w-1 audio-bar"
                    style={{
                      height: `${level}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">My Workstation</h1>
                <p className="text-sm text-gray-400">12 Devices running</p>
              </div>
              <button className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Add New Device
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Cloudy</p>
                  <p className="text-sm text-gray-400">21°C</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">12:45pm</p>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Sep 24th
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)]">
            {/* Accessories Section */}
            <div className="col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">ACCESSORIES</h2>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Nest Wi-Fi */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                  <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center mb-3">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium mb-1">Nest Wi-Fi</p>
                  <p className="text-xs text-gray-400">Running</p>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                </div>

                {/* Sony TV */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                  <div className="w-10 h-10 bg-[#0ea5e9] rounded-xl flex items-center justify-center mb-3">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium mb-1">Sony TV</p>
                  <p className="text-xs text-gray-400">Running</p>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                </div>

                {/* Router */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mb-3">
                    <div className="w-5 h-3 bg-white rounded-sm flex flex-col justify-center">
                      <div className="h-px bg-gray-700 mx-1" />
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">Router</p>
                  <p className="text-xs text-gray-400">Turned off</p>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                </div>
              </div>

              {/* Music Player */}
              <div className="bg-[#1a1d26] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Rainy day relaxing sound</p>
                  <p className="text-xs text-gray-400">Currently playing</p>
                </div>

                <div className="mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-green-600 to-green-800 rounded-xl mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">2:32</span>
                    <div className="flex-1 h-1 bg-gray-700 rounded-full">
                      <div className="w-1/3 h-full bg-white rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400">7:32</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <SkipBack className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Pause className="w-5 h-5 text-black" />
                  </button>
                  <SkipForward className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                  <Volume2 className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-8 space-y-4">
              {/* WiFi Router Stats */}
              <div className="bg-[#1a1d26] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Tp-Link Wifi Router</h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#22c55e] mb-1">162.68 Mbps</p>
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#f59e0b] mb-1">198.53 Mbps</p>
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                      <Upload className="w-3 h-3" />
                      Upload
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold mb-1">9ms</p>
                    <p className="text-xs text-gray-400">Idle Latency</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* LED Strips Light */}
                <div className="bg-[#1a1d26] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">LED STRIPS LIGHT</h3>
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="w-full h-full rounded-full border-8 border-gray-700 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#7c3aed] border-r-[#7c3aed] led-ring" />
                        <div className="absolute inset-2 rounded-full border-4 border-gray-600" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold">35%</p>
                          <p className="text-xs text-gray-400">Brightness</p>
                        </div>
                      </div>
                      <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#7c3aed] rounded-full flex items-center justify-center hover:bg-[#8b5cf6] transition-colors">
                        <Power className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-400">EFFECTS</h4>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Air Conditioner */}
                <div className="bg-[#1a1d26] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">AIR CONDITIONER</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400">2 report</span>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto relative">
                      <div className="w-full h-full rounded-full border-4 border-gray-700 relative">
                        <div 
                          className="w-full h-full rounded-full border-4 border-[#7c3aed] absolute"
                          style={{
                            background: `conic-gradient(#7c3aed 0deg, #7c3aed 60deg, transparent 60deg)`
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-lg font-bold">15°C</p>
                          <p className="text-xs text-gray-400">TEMPERATURE</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saving Mode</span>
                      <span>Up & Down</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wind Level</span>
                      <span>54%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electricity Consumed */}
              <div className="bg-[#1a1d26] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">ELECTRICITY CONSUMED</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Past 6 months</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Chart */}
                  <div className="h-32 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 120">
                      <defs>
                        <linearGradient id="energyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 80 Q 50 60 100 70 T 200 60 T 300 50 T 400 45"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M 0 80 Q 50 60 100 70 T 200 60 T 300 50 T 400 45 L 400 120 L 0 120 Z"
                        fill="url(#energyGradient)"
                      />
                    </svg>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
                      <span>100% ○</span>
                      <span>75% ○</span>
                      <span>50% ○</span>
                      <span>25% ○</span>
                      <span>0% ○</span>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AUG</span>
                    <span>SEP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}