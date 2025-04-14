
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import MonCheminSection from "@/components/MonCheminSection";
import AudioPlayer from "@/components/AudioPlayer";
import { Heart, Calendar, Star, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Bonjour");
    } else if (hour < 18) {
      setGreeting("Bon après-midi");
    } else {
      setGreeting("Bonsoir");
    }
  }, []);

  return (
    <Layout>
      <div className="pt-16 pb-20"> {/* Padding to account for fixed navbar and bottom navigation */}
        <Navbar />
        
        <div className="max-w-lg mx-auto px-4">
          <div className="mb-6 mt-4">
            <h1 className="text-2xl font-bold">{greeting}, Sophie</h1>
            <p className="text-muted-foreground">
              Que souhaitez-vous explorer aujourd'hui ?
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Personal wellness insight */}
            <div className="guidia-card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <Heart className="text-guidia-pink-dark mr-2" size={20} />
                  <h2 className="font-medium">Votre bien-être aujourd'hui</h2>
                </div>
                <div className="text-xs bg-guidia-pink/20 px-2 py-1 rounded-full">
                  Nouveau
                </div>
              </div>
              
              <p className="text-foreground/90 mb-4">
                "Prenez un moment pour vous reconnecter à votre corps aujourd'hui. 
                Une simple respiration consciente peut vous aider à retrouver votre centre."
              </p>
              
              <div className="flex justify-end">
                <button className="text-sm font-medium text-guidia-pink-dark flex items-center">
                  Méditation guidée
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            
            {/* Upcoming sessions */}
            <div className="guidia-card">
              <div className="flex items-center mb-3">
                <Calendar className="text-guidia-orange-dark mr-2" size={20} />
                <h2 className="font-medium">Votre programme</h2>
              </div>
              
              <div className="space-y-3 mb-2">
                <div className="flex items-center p-3 rounded-lg border border-guidia-yellow/30 bg-guidia-yellow/10">
                  <div className="w-10 text-center mr-3">
                    <div className="text-sm font-bold">15</div>
                    <div className="text-xs text-muted-foreground">MAI</div>
                  </div>
                  <div>
                    <div className="font-medium">Méditation d'ancrage</div>
                    <div className="text-sm text-muted-foreground">10:00 - 10:15</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg border border-guidia-green/30 bg-guidia-green/10">
                  <div className="w-10 text-center mr-3">
                    <div className="text-sm font-bold">17</div>
                    <div className="text-xs text-muted-foreground">MAI</div>
                  </div>
                  <div>
                    <div className="font-medium">Pratique de compassion</div>
                    <div className="text-sm text-muted-foreground">18:30 - 19:00</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Audio recommendation */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium">Audio recommandé</h2>
                <Star className="text-guidia-yellow-dark" size={16} />
              </div>
              
              <AudioPlayer />
            </div>
            
            {/* Path progress */}
            <MonCheminSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
