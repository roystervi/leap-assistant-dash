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
  Monitor,
  Menu,
  X,
  Shield,
  Lock,
  Unlock,
  Eye,
  AlertTriangle
} from 'lucide-react';

export function ExactDashboard() {
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [alarmStatus, setAlarmStatus] = useState<'disarmed' | 'armed_home' | 'armed_away' | 'triggered'>('disarmed');
  const [alarmZones, setAlarmZones] = useState([
    { id: 1, name: 'Front Door', status: 'secure', type: 'entry' },
    { id: 2, name: 'Windows', status: 'secure', type: 'perimeter' },
    { id: 3, name: 'Motion', status: 'secure', type: 'motion' },
    { id: 4, name: 'Back Door', status: 'secure', type: 'entry' }
  ]);

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1920) setScreenSize('tv');
      else if (width >= 1200) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAlarmAction = (action: 'disarm' | 'arm_home' | 'arm_away') => {
    setAlarmStatus(action === 'disarm' ? 'disarmed' : action === 'arm_home' ? 'armed_home' : 'armed_away');
  };

  const getAlarmStatusColor = () => {
    switch (alarmStatus) {
      case 'disarmed': return '#6b7280';
      case 'armed_home': return '#f59e0b';
      case 'armed_away': return '#22c55e';
      case 'triggered': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getAlarmStatusText = () => {
    switch (alarmStatus) {
      case 'disarmed': return 'DISARMED';
      case 'armed_home': return 'ARMED HOME';
      case 'armed_away': return 'ARMED AWAY';
      case 'triggered': return 'TRIGGERED';
      default: return 'DISARMED';
    }
  };

  const getSidebarClass = () => {
    if (screenSize === 'mobile') {
      return sidebarOpen 
        ? 'fixed inset-y-0 left-0 z-50 w-72 transform translate-x-0 transition-transform duration-300'
        : 'fixed inset-y-0 left-0 z-50 w-72 transform -translate-x-full transition-transform duration-300';
    }
    if (screenSize === 'tablet') {
      return 'w-16 hover:w-72 transition-all duration-300 group';
    }
    return 'w-72';
  };

  const getMainContentClass = () => {
    if (screenSize === 'mobile') {
      return 'flex-1';
    }
    if (screenSize === 'tablet') {
      return 'flex-1 ml-16';
    }
    return 'flex-1';
  };

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
        @media (min-width: 1920px) {
          .tv-scale {
            transform: scale(1.2);
            transform-origin: top left;
          }
        }
      `}</style>
      
      <div className="flex h-screen relative">
        {/* Mobile Overlay */}
        {screenSize === 'mobile' && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <div className={`${getSidebarClass()} bg-[#0e1017] flex flex-col`}>
          {/* Mobile Close Button */}
          {screenSize === 'mobile' && (
            <button 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="p-6 flex-1">
            {/* User Profile */}
            <div className={`flex items-center gap-3 mb-8 ${
              screenSize === 'tablet' ? 'group-hover:opacity-100 opacity-0 transition-opacity' : ''
            }`}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                  G
                </div>
              </div>
              <div className={`flex-1 ${
                screenSize === 'tablet' ? 'group-hover:block hidden' : ''
              }`}>
                <p className="text-xs text-gray-400 font-medium tracking-wide">GOOD EVENING</p>
                <h2 className="text-lg font-semibold">Guy Hawkins</h2>
              </div>
              <MoreHorizontal className={`w-5 h-5 text-gray-400 ${
                screenSize === 'tablet' ? 'group-hover:block hidden' : ''
              }`} />
            </div>

            {/* My Rooms Section */}
            <div className="mb-8">
              <h3 className={`text-sm font-medium text-gray-400 mb-4 tracking-wide ${
                screenSize === 'tablet' ? 'group-hover:block hidden' : ''
              }`}>MY ROOMS</h3>
              <div className={`grid gap-3 ${
                screenSize === 'mobile' ? 'grid-cols-2' : 
                screenSize === 'tablet' ? 'grid-cols-1 group-hover:grid-cols-2' : 
                'grid-cols-2'
              }`}>
                {/* Room Cards */}
                {['Entrance', 'Backyard', 'Living Room', 'Front Room'].map((room) => (
                  <div key={room} className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors h-[100px] flex flex-col">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                      <Home className="w-4 h-4" />
                    </div>
                    <p className={`text-sm font-medium mt-auto ${
                      screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                    }`}>{room}</p>
                    <MoreHorizontal className={`w-4 h-4 text-gray-400 absolute top-4 right-4 ${
                      screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                    }`} />
                  </div>
                ))}

                {/* My Workstation - Active */}
                <div className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-2xl p-4 relative shadow-lg shadow-purple-500/20 h-[100px] flex flex-col">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Home className="w-4 h-4" />
                  </div>
                  <p className={`text-sm font-medium mt-auto ${
                    screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                  }`}>My Workstation</p>
                  <MoreHorizontal className={`w-4 h-4 text-white/70 absolute top-4 right-4 ${
                    screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                  }`} />
                </div>

                {/* Add New */}
                <div className="border-2 border-dashed border-[#7c3aed] rounded-2xl p-4 flex flex-col items-center justify-center h-[100px] hover:border-[#a855f7] hover:bg-[#7c3aed]/5 transition-colors">
                  <Plus className="w-6 h-6 text-[#7c3aed] mb-2" />
                  <p className={`text-sm text-[#7c3aed] font-medium text-center ${
                    screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                  }`}>Add new</p>
                </div>
              </div>
            </div>

            {/* Set Room Environment */}
            <div className="mb-8">
              <h3 className={`text-sm font-medium text-gray-400 mb-4 tracking-wide ${
                screenSize === 'tablet' ? 'group-hover:block hidden' : ''
              }`}>SET ROOM ENVIRONMENT</h3>
              <div className={`grid gap-2 ${
                screenSize === 'mobile' ? 'grid-cols-4' :
                screenSize === 'tablet' ? 'grid-cols-1 group-hover:grid-cols-4' :
                'grid-cols-4'
              }`}>
                {[
                  { name: 'Music Mode', icon: Volume2, active: false },
                  { name: 'Cool and Relax', icon: Settings, active: true },
                  { name: 'Night Vision', icon: Settings, active: false },
                  { name: 'Smart Home', icon: Home, active: false }
                ].map((mode) => (
                  <div key={mode.name} className={`rounded-xl p-3 flex flex-col items-center text-center transition-colors cursor-pointer h-[70px] ${
                    mode.active 
                      ? 'bg-gradient-to-br from-[#7c3aed] to-[#a855f7] shadow-lg shadow-purple-500/20'
                      : 'bg-[#1a1d26] hover:bg-[#1f232c]'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      mode.active ? 'bg-white/20' : 'bg-gray-700'
                    }`}>
                      <mode.icon className="w-4 h-4" />
                    </div>
                    <p className={`text-xs ${
                      screenSize === 'tablet' ? 'group-hover:block hidden' : ''
                    }`}>{mode.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Assistant */}
            <div className="flex-1">
              <h3 className={`text-sm font-medium text-gray-400 mb-4 tracking-wide ${
                screenSize === 'tablet' ? 'group-hover:block hidden' : ''
              }`}>VOICE ASSISTANCE</h3>
              <div className="bg-[#1a1d26] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div className={screenSize === 'tablet' ? 'group-hover:block hidden' : ''}>
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
        </div>

        {/* Main Content */}
        <div className={getMainContentClass()}>
          {/* Mobile Header with Menu Button */}
          {screenSize === 'mobile' && (
            <div className="flex items-center justify-between p-4 bg-[#0e1017] border-b border-gray-800">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold">My Workstation</h1>
              <div className="text-right">
                <p className="text-sm font-bold">12:45pm</p>
              </div>
            </div>
          )}

          <div className="p-6 h-full overflow-auto">
            {/* Header - Hidden on mobile */}
            {screenSize !== 'mobile' && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className={`font-bold ${
                      screenSize === 'tv' ? 'text-3xl' : 'text-2xl'
                    }`}>My Workstation</h1>
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
                    <p className={`font-bold ${
                      screenSize === 'tv' ? 'text-xl' : 'text-lg'
                    }`}>12:45pm</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Sep 24th
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Grid - Fixed height container for perfect alignment */}
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
              {/* Left Column - Accessories */}
              <div className="col-span-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">ACCESSORIES</h2>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                {/* Accessories Grid - Fixed height */}
                <div className="grid grid-cols-3 gap-3 mb-4 h-[120px]">
                  {/* Nest Wi-Fi */}
                  <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center mb-3">
                      <Wifi className="w-5 h-5" />
                    </div>
                    <div className="mt-auto">
                      <p className="text-sm font-medium mb-1">Nest Wi-Fi</p>
                      <p className="text-xs text-gray-400">Running</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                  </div>

                  {/* Sony TV */}
                  <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 bg-[#0ea5e9] rounded-xl flex items-center justify-center mb-3">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="mt-auto">
                      <p className="text-sm font-medium mb-1">Sony TV</p>
                      <p className="text-xs text-gray-400">Running</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                  </div>

                  {/* Router */}
                  <div className="bg-[#1a1d26] rounded-2xl p-4 relative hover:bg-[#1f232c] transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mb-3">
                      <div className="w-5 h-3 bg-white rounded-sm flex flex-col justify-center">
                        <div className="h-px bg-gray-700 mx-1" />
                        <div className="h-px bg-gray-700 mx-1 mt-1" />
                        <div className="h-px bg-gray-700 mx-1 mt-1" />
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="text-sm font-medium mb-1">Router</p>
                      <p className="text-xs text-gray-400">Turned off</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
                  </div>
                </div>

                {/* Music Player - Takes remaining space */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 flex-1 flex flex-col">
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

                  <div className="flex-1 flex flex-col">
                    <div className="w-full h-32 bg-gradient-to-br from-green-600 to-green-800 rounded-xl mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-400">2:32</span>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full">
                        <div className="w-1/3 h-full bg-white rounded-full" />
                      </div>
                      <span className="text-xs text-gray-400">7:32</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-auto">
                      <SkipBack className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Pause className="w-5 h-5 text-black" />
                      </button>
                      <SkipForward className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                      <Volume2 className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-8 flex flex-col">
                {/* WiFi Router Stats - Fixed height */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 h-[120px] mb-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Tp-Link Wifi Router</h3>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center flex-1">
                    <div className="flex flex-col justify-center">
                      <p className="text-2xl font-bold text-[#22c55e] mb-1">162.68 Mbps</p>
                      <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-2xl font-bold text-[#f59e0b] mb-1">198.53 Mbps</p>
                      <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3" />
                        Upload
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-2xl font-bold mb-1">9ms</p>
                      <p className="text-xs text-gray-400">Idle Latency</p>
                    </div>
                  </div>
                </div>

                {/* LED & Thermostat Row - Fixed height */}
                <div className="grid grid-cols-2 gap-4 h-[280px] mb-4">
                  {/* LED Strips Light */}
                  <div className="bg-[#1a1d26] rounded-2xl p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">LED STRIPS LIGHT</h3>
                      <Settings className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 mx-auto relative mb-4">
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

                      <div className="space-y-2 mt-auto">
                        <h4 className="text-sm font-medium text-gray-400">EFFECTS</h4>
                        <div className="flex gap-2 justify-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg cursor-pointer hover:scale-110 transition-transform" />
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg cursor-pointer hover:scale-110 transition-transform" />
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Alarm Panel */}
                  <div className="bg-[#1a1d26] rounded-2xl p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">SECURITY ALARM</h3>
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            alarmStatus === 'disarmed' ? 'bg-gray-500' :
                            alarmStatus === 'triggered' ? 'bg-red-500 animate-pulse' :
                            'bg-green-500 animate-pulse'
                          }`} 
                        />
                        <span className="text-xs text-gray-400">{getAlarmStatusText()}</span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-28 h-28 mx-auto relative mb-4">
                        <div className="w-full h-full rounded-full border-4 border-gray-700 relative">
                          <div 
                            className={`w-full h-full rounded-full border-4 absolute transition-all duration-500 ${
                              alarmStatus === 'triggered' ? 'animate-pulse' : ''
                            }`}
                            style={{
                              borderColor: getAlarmStatusColor(),
                              background: `conic-gradient(${getAlarmStatusColor()} 0deg, ${getAlarmStatusColor()} ${
                                alarmStatus === 'disarmed' ? '0' : '360'
                              }deg, transparent ${alarmStatus === 'disarmed' ? '0' : '360'}deg)`
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            {alarmStatus === 'disarmed' ? (
                              <Unlock className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                            ) : alarmStatus === 'triggered' ? (
                              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-1" />
                            ) : (
                              <Shield className="w-8 h-8 text-green-500 mx-auto mb-1" />
                            )}
                            <p className="text-xs text-gray-400">STATUS</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 w-full mt-auto">
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <button
                            onClick={() => handleAlarmAction('disarm')}
                            className={`p-2 rounded-lg text-xs font-medium transition-all ${
                              alarmStatus === 'disarmed' 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                          >
                            <Unlock className="w-4 h-4 mx-auto mb-1" />
                            DISARM
                          </button>
                          <button
                            onClick={() => handleAlarmAction('arm_home')}
                            className={`p-2 rounded-lg text-xs font-medium transition-all ${
                              alarmStatus === 'armed_home' 
                                ? 'bg-amber-600 text-white' 
                                : 'bg-gray-700 text-gray-400 hover:bg-amber-700'
                            }`}
                          >
                            <Eye className="w-4 h-4 mx-auto mb-1" />
                            HOME
                          </button>
                          <button
                            onClick={() => handleAlarmAction('arm_away')}
                            className={`p-2 rounded-lg text-xs font-medium transition-all ${
                              alarmStatus === 'armed_away' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-700 text-gray-400 hover:bg-green-700'
                            }`}
                          >
                            <Lock className="w-4 h-4 mx-auto mb-1" />
                            AWAY
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {alarmZones.map((zone) => (
                            <div key={zone.id} className="flex items-center justify-between bg-[#0f1117] rounded p-2">
                              <span className="text-gray-400 truncate">{zone.name}</span>
                              <div className={`w-2 h-2 rounded-full ${
                                zone.status === 'secure' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Electricity Consumed - Takes remaining space */}
                <div className="bg-[#1a1d26] rounded-2xl p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">ELECTRICITY CONSUMED</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Past 6 months</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    {/* Chart */}
                    <div className="h-32 relative mb-4 pl-8">
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
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
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
    </div>
  );
}