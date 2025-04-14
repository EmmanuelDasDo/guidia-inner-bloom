
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowRight, Anchor, Brain, Heart, Sun } from "lucide-react";

interface ThematicPathProps {
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  bgColor: string;
}

const MonCheminSection = () => {
  const paths: ThematicPathProps[] = [
    {
      title: "Ancrage et Stabilité",
      description: "Développez votre sens de sécurité intérieure et d'appartenance",
      progress: 35,
      icon: <Anchor size={24} />,
      bgColor: "bg-guidia-yellow/20",
    },
    {
      title: "Clarté Mentale",
      description: "Affinez votre concentration et votre discernement",
      progress: 15,
      icon: <Brain size={24} />,
      bgColor: "bg-guidia-green/20",
    },
    {
      title: "Ouverture du Cœur",
      description: "Cultivez compassion et connexion authentique",
      progress: 60,
      icon: <Heart size={24} />,
      bgColor: "bg-guidia-pink/20",
    },
    {
      title: "Confiance et Expression",
      description: "Exprimez votre vérité avec assurance",
      progress: 0,
      icon: <Sun size={24} />,
      bgColor: "bg-guidia-orange/20",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mon Chemin</h2>
          <div className="flex items-center text-guidia-pink-dark">
            <Sparkles size={18} className="mr-1" />
            <span className="text-sm font-medium">Personnalisé pour vous</span>
          </div>
        </div>
        <p className="text-muted-foreground mt-1">
          Suivez votre parcours de développement personnel
        </p>
      </div>

      <div className="space-y-4">
        {paths.map((path, index) => (
          <PathCard key={index} {...path} />
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg border border-guidia-pink/30 bg-guidia-pink/5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Recommandé pour vous</h3>
          <Sparkles size={16} className="text-guidia-orange-dark" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Basé sur votre bilan initial et votre parcours récent
        </p>
        <div className="guidia-card">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-full bg-guidia-pink/20`}>
              <Heart size={20} className="text-guidia-pink-dark" />
            </div>
            <h4 className="font-medium">Pratique de compassion</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Une méditation guidée de 10 minutes pour cultiver la bienveillance envers soi-même
          </p>
          <button className="flex items-center text-sm font-medium text-guidia-pink-dark hover:underline">
            Commencer la pratique
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PathCard: React.FC<ThematicPathProps> = ({
  title,
  description,
  progress,
  icon,
  bgColor,
}) => {
  const isLocked = progress === 0;

  return (
    <div className={`guidia-card ${isLocked ? "opacity-70" : ""}`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-full ${bgColor} mr-4`}>
          {icon}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">{title}</h3>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <Progress value={progress} className="h-2 mb-3" />
          <button 
            className={`flex items-center text-sm font-medium ${
              isLocked 
                ? "text-muted-foreground cursor-not-allowed"
                : "text-guidia-pink-dark hover:underline"
            }`}
            disabled={isLocked}
          >
            {isLocked ? "Bientôt disponible" : "Continuer"}
            {!isLocked && <ArrowRight size={16} className="ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonCheminSection;
