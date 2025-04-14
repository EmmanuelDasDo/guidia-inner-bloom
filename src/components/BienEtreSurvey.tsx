
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Brain, Zap, Globe } from "lucide-react";

interface Question {
  id: number;
  category: "emotional" | "physical" | "energy" | "environment";
  text: string;
  options: string[];
  icon: React.ReactNode;
}

const BienEtreSurvey = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      category: "emotional",
      text: "Comment décririez-vous votre état émotionnel général ces derniers temps?",
      options: [
        "Stable et positif",
        "Fluctuant mais généralement bon",
        "Souvent anxieux ou préoccupé",
        "Dépassé ou en détresse",
        "Je ne sais pas vraiment"
      ],
      icon: <Heart className="text-guidia-pink-dark" />
    },
    {
      id: 2,
      category: "emotional",
      text: "Quel est votre niveau de stress au quotidien?",
      options: [
        "Très bas - je me sens détendu la plupart du temps",
        "Modéré - je ressens du stress occasionnellement",
        "Élevé - je ressens du stress fréquemment",
        "Très élevé - je me sens constamment stressé"
      ],
      icon: <Brain className="text-guidia-pink-dark" />
    },
    {
      id: 3,
      category: "physical",
      text: "Comment évaluez-vous votre niveau d'énergie physique?",
      options: [
        "Excellent - énergique tout au long de la journée",
        "Bon - énergique la plupart du temps",
        "Moyen - des hauts et des bas d'énergie",
        "Faible - souvent fatigué"
      ],
      icon: <Zap className="text-guidia-yellow-dark" />
    },
    {
      id: 4,
      category: "physical",
      text: "Comment qualifieriez-vous votre sommeil?",
      options: [
        "Réparateur et régulier",
        "Généralement bon avec quelques nuits difficiles",
        "Souvent perturbé ou insuffisant",
        "Très difficile ou insuffisant"
      ],
      icon: <Zap className="text-guidia-yellow-dark" />
    },
    {
      id: 5,
      category: "energy",
      text: "Comment vous sentez-vous connecté à votre intuition?",
      options: [
        "Très connecté - je fais confiance à mes intuitions",
        "Modérément connecté - parfois j'écoute mon intuition",
        "Peu connecté - j'ai du mal à identifier mon intuition",
        "Déconnecté - je ne ressens pas d'intuition claire"
      ],
      icon: <Globe className="text-guidia-green-dark" />
    },
    {
      id: 6,
      category: "environment",
      text: "Dans quelle mesure votre environnement actuel soutient-il votre bien-être?",
      options: [
        "Très soutenant - mon environnement favorise mon épanouissement",
        "Plutôt soutenant - avec quelques aspects à améliorer",
        "Peu soutenant - plusieurs aspects négatifs affectent mon bien-être",
        "Pas du tout soutenant - mon environnement nuit à mon bien-être"
      ],
      icon: <Globe className="text-guidia-green-dark" />
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed
      handleSurveyCompletion();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSurveyCompletion = () => {
    setLoading(true);
    // In a real app, you would send this data to your backend
    console.log("Survey answers:", answers);
    
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-[calc(100vh-4rem)] justify-center">
      <div className="mb-6">
        <div className="w-full h-2 bg-guidia-pink/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-guidia-pink to-guidia-orange transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-muted-foreground mt-1">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="guidia-card mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
            {currentQuestion.icon}
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-center mb-6">
          {currentQuestion.text}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                answers[currentQuestion.id] === option
                  ? "border-guidia-pink bg-guidia-pink/10"
                  : "border-guidia-pink/30 hover:border-guidia-pink/60 hover:bg-guidia-pink/5"
              }`}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            currentQuestionIndex === 0
              ? "text-muted-foreground cursor-not-allowed"
              : "text-foreground hover:bg-guidia-pink/10"
          }`}
        >
          <ChevronLeft size={20} className="mr-1" />
          Précédent
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id] || loading}
          className={`guidia-button flex items-center ${
            loading ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              Suivant
              <ChevronRight size={20} className="ml-1" />
            </>
          ) : loading ? (
            "Analyse en cours..."
          ) : (
            "Terminer"
          )}
        </button>
      </div>
    </div>
  );
};

export default BienEtreSurvey;
