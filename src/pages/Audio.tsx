
import { useState } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import { Music, Search, Filter } from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  category: string;
}

const Audio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  
  const tracks: AudioTrack[] = [
    {
      id: "1",
      title: "Méditation d'ancrage",
      artist: "Guidia",
      duration: 600, // 10 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Méditation"
    },
    {
      id: "2",
      title: "Sommeil réparateur",
      artist: "Guidia",
      duration: 1200, // 20 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnJ5JTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",
      category: "Sommeil"
    },
    {
      id: "3",
      title: "Ouverture du cœur",
      artist: "Guidia",
      duration: 900, // 15 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Méditation"
    },
    {
      id: "4",
      title: "Respiration apaisante",
      artist: "Guidia",
      duration: 300, // 5 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Respiration"
    },
    {
      id: "5",
      title: "Sons de la nature",
      artist: "Guidia",
      duration: 1800, // 30 minutes in seconds
      coverUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Sons"
    },
  ];

  const categories = ["Tous", "Méditation", "Sommeil", "Respiration", "Sons"];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || track.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="pt-16 pb-20">
        <Navbar />
        
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-between items-center mb-6 mt-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Music className="mr-2" size={24} />
                Audio
              </h1>
              <p className="text-muted-foreground">
                Méditations et sons apaisants
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="guidia-input pl-10"
              />
            </div>
            
            <div className="flex overflow-x-auto py-2 space-x-2 no-scrollbar">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-guidia-pink text-white"
                      : "bg-white border border-guidia-pink/30 hover:bg-guidia-pink/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {filteredTracks.length > 0 ? (
              filteredTracks.map(track => (
                <div 
                  key={track.id}
                  className="guidia-card flex items-center cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={track.coverUrl} 
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs uppercase text-guidia-pink-dark font-medium">
                      {track.category}
                    </div>
                    <h3 className="font-medium">{track.title}</h3>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">{track.artist}</div>
                      <div className="text-xs text-muted-foreground">{formatDuration(track.duration)}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Aucun résultat pour votre recherche</p>
              </div>
            )}
          </div>
          
          <AudioPlayer />
        </div>
      </div>
    </Layout>
  );
};

export default Audio;
