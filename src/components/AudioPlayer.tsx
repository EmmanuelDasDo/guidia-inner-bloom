
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  category: string;
}

const AudioPlayer = () => {
  const [tracks] = useState<AudioTrack[]>([
    {
      id: "1",
      title: "Méditation d'ancrage",
      artist: "Guidia",
      duration: 600, // 10 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      audioUrl: "#", // This would be the actual audio file path
      category: "Méditation"
    },
    {
      id: "2",
      title: "Sommeil réparateur",
      artist: "Guidia",
      duration: 1200, // 20 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnJ5JTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",
      audioUrl: "#",
      category: "Sommeil"
    },
    {
      id: "3",
      title: "Ouverture du cœur",
      artist: "Guidia",
      duration: 900, // 15 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      audioUrl: "#",
      category: "Méditation"
    },
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    // Reset state when changing tracks
    setCurrentTime(0);
    setIsPlaying(false);
    
    // In a real app, would load the audio file here
    // For now, we'll just simulate some delay to mimic loading
    const timer = setTimeout(() => {
      if (isPlaying) {
        audioRef.current?.play();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentTrackIndex]);

  // Update progress periodically if playing
  useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        // In a real app, would get time from audio element
        // For the demo, we'll just increment time
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => 
      prev === tracks.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => 
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressPercent = clickPosition / rect.width;
    
    const newTime = progressPercent * currentTrack.duration;
    setCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Progress percentage
  const progressPercent = (currentTime / currentTrack.duration) * 100;

  // Volume icon based on volume level
  const VolumeIcon = isMuted ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-16">
      {/* Invisible audio element that would handle the actual audio */}
      <audio ref={audioRef} src={currentTrack.audioUrl} />
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Album Cover */}
        <div className="w-full md:w-40 h-40 rounded-lg overflow-hidden shadow-md mb-4 md:mb-0">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          {/* Track Info */}
          <div className="mb-4">
            <div className="text-xs uppercase text-guidia-pink-dark font-medium">
              {currentTrack.category}
            </div>
            <h3 className="text-xl font-bold">{currentTrack.title}</h3>
            <div className="text-muted-foreground">{currentTrack.artist}</div>
          </div>
          
          {/* Progress Bar */}
          <div 
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-2 bg-guidia-pink/20 rounded-full cursor-pointer mb-2 overflow-hidden"
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-guidia-pink to-guidia-orange"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-guidia-pink/10 transition-colors"
              >
                <VolumeIcon size={20} />
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-guidia-pink-dark"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevious}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-guidia-pink/10 transition-colors"
              >
                <SkipBack size={24} />
              </button>
              
              <button 
                onClick={handlePlayPause}
                className="p-3 bg-guidia-pink text-white rounded-full hover:bg-guidia-pink-dark transition-colors shadow-sm"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              
              <button 
                onClick={handleNext}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-guidia-pink/10 transition-colors"
              >
                <SkipForward size={24} />
              </button>
            </div>
            
            <div className="w-24 md:block hidden">
              {/* Spacing element to balance layout */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
