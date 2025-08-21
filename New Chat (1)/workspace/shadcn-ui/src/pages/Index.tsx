import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, RotateCcw, Timer, Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

type OrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
}

// Alarm Clock Component
const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const handleSetAlarm = () => {
    if (alarmTime) {
      setAlarmSet(true);
      // In a real app, you'd implement actual alarm functionality
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <Clock className="w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold mb-8">Alarm Clock</h1>
      
      <div className="text-6xl font-mono mb-8 text-center">
        {formatTime(currentTime)}
      </div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <Input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            />
            <Button onClick={handleSetAlarm} className="w-full">
              Set Alarm
            </Button>
            {alarmSet && (
              <Badge className="bg-green-500">
                Alarm set for {alarmTime}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Stopwatch Component
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => setTime(time => time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatStopwatchTime = (centiseconds: number) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-900 to-teal-900 text-white landscape:flex-row landscape:gap-8">
      <div className="text-center landscape:flex-1">
        <Play className="w-16 h-16 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-8">Stopwatch</h1>
        
        <div className="text-5xl font-mono mb-8">
          {formatStopwatchTime(time)}
        </div>
      </div>
      
      <div className="flex gap-4 landscape:flex-col landscape:flex-1">
        <Button
          onClick={handleStartStop}
          size="lg"
          className={`flex items-center gap-2 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button onClick={handleReset} size="lg" className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <RotateCcw className="w-5 h-5" />
          Reset
        </Button>
      </div>
    </div>
  );
};

// Timer Component
const TimerComponent = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Timer finished - could add notification here
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-orange-900 to-red-900 text-white">
      <Timer className="w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold mb-8">Timer</h1>
      
      {!isRunning && timeLeft === 0 ? (
        <Card className="w-full max-w-md bg-white/10 backdrop-blur border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Minutes</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Seconds</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
            </div>
            <Button onClick={startTimer} className="w-full">
              Start Timer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center mb-8">
          <div className="text-6xl font-mono mb-8">
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={stopTimer} size="lg" className="bg-red-600 hover:bg-red-700">
              <Pause className="w-5 h-5 mr-2" />
              Stop
            </Button>
            <Button onClick={resetTimer} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}
      
      {timeLeft === 0 && isRunning === false && (minutes > 0 || seconds > 0) && (
        <Badge className="bg-green-500 text-lg p-2">
          Timer Finished!
        </Badge>
      )}
    </div>
  );
};

// Weather Component
const WeatherComponent = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Using OpenWeatherMap API - you'll need to get a free API key
      // For demo purposes, I'll use a mock response
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data
      const mockWeather: WeatherData = {
        location: 'Current Location',
        temperature: 22,
        description: 'Partly Cloudy',
        icon: 'partly-cloudy'
      };
      
      setWeather(mockWeather);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case 'sunny':
        return <Sun className="w-16 h-16" />;
      case 'rainy':
        return <CloudRain className="w-16 h-16" />;
      case 'snowy':
        return <Snowflake className="w-16 h-16" />;
      default:
        return <Cloud className="w-16 h-16" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-sky-900 to-blue-900 text-white landscape:flex-row">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
        <p className="text-xl">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-sky-900 to-blue-900 text-white">
        <p className="text-xl text-red-300 mb-4">{error}</p>
        <Button onClick={fetchWeather}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-sky-900 to-blue-900 text-white landscape:flex-row landscape:gap-8">
      <div className="text-center landscape:flex-1">
        <div className="mb-6">
          {getWeatherIcon(weather?.icon || 'cloudy')}
        </div>
        <h1 className="text-3xl font-bold mb-4">Weather Today</h1>
      </div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur border-white/20 landscape:flex-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">{weather?.location}</h2>
          <div className="text-5xl font-bold mb-2">{weather?.temperature}°C</div>
          <p className="text-lg text-gray-200 mb-4">{weather?.description}</p>
          
          <Button onClick={fetchWeather} variant="outline" className="w-full">
            Refresh Weather
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Index() {
  const [orientation, setOrientation] = useState<OrientationType>('portrait-primary');

  useEffect(() => {
    const handleOrientationChange = () => {
      if (screen.orientation) {
        setOrientation(screen.orientation.type as OrientationType);
      } else {
        // Fallback for browsers without screen.orientation API
        const angle = window.orientation;
        if (angle === 0) setOrientation('portrait-primary');
        else if (angle === 180) setOrientation('portrait-secondary');
        else if (angle === 90) setOrientation('landscape-primary');
        else if (angle === -90) setOrientation('landscape-secondary');
      }
    };

    // Set initial orientation
    handleOrientationChange();

    // Listen for orientation changes
    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
    } else {
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    return () => {
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
    };
  }, []);

  const renderComponent = () => {
    switch (orientation) {
      case 'portrait-primary':
        return <AlarmClock />;
      case 'landscape-primary':
        return <Stopwatch />;
      case 'portrait-secondary':
        return <TimerComponent />;
      case 'landscape-secondary':
        return <WeatherComponent />;
      default:
        return <AlarmClock />;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {renderComponent()}
      
      {/* Orientation Debug Info - Remove in production */}
      <div className="fixed bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {orientation}
      </div>
    </div>
  );
}