
import { Check, X } from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanProps {
  title: string;
  price: string;
  features: PlanFeature[];
  isPopular?: boolean;
  buttonText: string;
  onSelect: () => void;
}

const SubscriptionPlans = () => {
  const handleSelectPlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    // This would typically initiate the subscription process
  };

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Choisissez votre parcours</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sélectionnez l'offre qui correspond le mieux à vos besoins d'accompagnement
          et de développement personnel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PlanCard
          title="Éveil"
          price="40€/mois"
          features={[
            { name: "Bilan holistique complet", included: true },
            { name: "Parcours thématiques guidés", included: true },
            { name: "Accès au carnet de bord intérieur", included: true },
            { name: "Guidance IA illimitée", included: true },
            { name: "Méditations guidées (basiques)", included: true },
            { name: "Contenu audio exclusif", included: false },
            { name: "Accès à la communauté", included: false },
            { name: "Sessions d'accompagnement personnalisées", included: false },
          ]}
          buttonText="Commencer l'Éveil"
          onSelect={() => handleSelectPlan("éveil")}
        />

        <PlanCard
          title="Transformation"
          price="130€/mois"
          features={[
            { name: "Bilan holistique complet", included: true },
            { name: "Parcours thématiques guidés", included: true },
            { name: "Accès au carnet de bord intérieur", included: true },
            { name: "Guidance IA illimitée", included: true },
            { name: "Bibliothèque complète de méditations", included: true },
            { name: "Contenu audio exclusif", included: true },
            { name: "Accès à la communauté", included: true },
            { name: "Sessions d'accompagnement personnalisées", included: true },
          ]}
          isPopular={true}
          buttonText="Commencer la Transformation"
          onSelect={() => handleSelectPlan("transformation")}
        />
      </div>

      <div className="text-center mt-8 text-sm text-muted-foreground">
        Tous les abonnements incluent une période d'essai de 7 jours. Annulez à tout moment.
      </div>
    </div>
  );
};

const PlanCard: React.FC<PlanProps> = ({
  title,
  price,
  features,
  isPopular,
  buttonText,
  onSelect,
}) => {
  return (
    <div className={`guidia-card relative ${isPopular ? "border-guidia-pink" : ""}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-guidia-pink text-white px-4 py-1 rounded-full text-sm font-medium">
          Recommandé
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-3xl font-bold">{price}</div>
        <div className="text-sm text-muted-foreground mt-1">Annulez à tout moment</div>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            {feature.included ? (
              <Check size={20} className="text-guidia-green-dark mr-2 flex-shrink-0" />
            ) : (
              <X size={20} className="text-muted-foreground mr-2 flex-shrink-0" />
            )}
            <span className={feature.included ? "" : "text-muted-foreground"}>
              {feature.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isPopular
            ? "bg-gradient-to-r from-guidia-pink to-guidia-orange text-white shadow-md hover:shadow-lg"
            : "bg-white border border-guidia-pink/50 text-foreground hover:bg-guidia-pink/10"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SubscriptionPlans;
