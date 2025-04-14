
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  
  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/bilan");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-guidia">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-guidia-pink/30 animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-guidia-yellow/30 animate-float blur-xl" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-guidia-green/30 animate-float blur-xl" style={{ animationDelay: "2s" }} />

      <div className="container px-4 py-20 mx-auto flex flex-col justify-center min-h-screen relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm mb-6">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-guidia-pink-dark to-guidia-orange-dark">
              ✨ Votre guide personnel pour un bien-être holistique
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Découvrez votre chemin vers{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-guidia-pink-dark to-guidia-orange-dark">
              l'épanouissement
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Guidia vous accompagne avec une approche personnalisée pour votre bien-être émotionnel, 
            physique et spirituel, comme une amie bienveillante à vos côtés.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => navigate("/bilan")}
              className="guidia-button"
            >
              Commencer mon bilan
            </button>
            <button 
              onClick={() => navigate("/abonnements")}
              className="guidia-button-secondary"
            >
              Voir les abonnements
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <FeatureCard 
              icon={<Heart className="text-guidia-pink-dark" size={24} />}
              title="Bilan holistique"
              description="Une approche complète pour comprendre vos besoins émotionnels et physiques."
            />
            <FeatureCard 
              icon={<Star className="text-guidia-yellow-dark" size={24} />}
              title="IA personnalisée"
              description="Des conseils sur mesure qui évoluent avec vous et votre parcours unique."
            />
            <FeatureCard 
              icon={<Sparkles className="text-guidia-orange-dark" size={24} />}
              title="Parcours thématiques"
              description="Des chemins adaptés pour vous guider vers l'ancrage et la confiance."
            />
          </div>
          
          <div className="mt-12">
            <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="guidia-input flex-grow"
                required
              />
              <button type="submit" className="guidia-button whitespace-nowrap">
                Commencer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="guidia-card w-full sm:w-56 flex flex-col items-center text-center">
      <div className="p-3 rounded-full bg-white shadow-sm mb-3">
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
};

export default Hero;
