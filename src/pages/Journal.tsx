
import { useState } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import JournalCard from "@/components/JournalCard";
import { PlusCircle, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood?: string;
}

const Journal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(2023, 4, 14), // May 14, 2023
      content: "Aujourd'hui j'ai ressenti une grande paix intérieure pendant ma méditation du matin. Je commence à voir les bénéfices de cette pratique quotidienne.",
      mood: "Serein",
    },
    {
      id: "2",
      date: new Date(2023, 4, 12), // May 12, 2023
      content: "Journée difficile au travail, beaucoup de stress. J'ai essayé les exercices de respiration suggérés par Guidia et ça m'a aidé à retrouver un peu de calme.",
      mood: "Stressé",
    },
  ]);
  
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryMood, setNewEntryMood] = useState("");

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newEntryContent.trim() === "") return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: newEntryContent,
      mood: newEntryMood || undefined,
    };
    
    setEntries([newEntry, ...entries]);
    setNewEntryContent("");
    setNewEntryMood("");
    setShowNewEntryForm(false);
    
    toast({
      title: "Note ajoutée",
      description: "Votre note a été ajoutée à votre journal",
    });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    toast({
      title: "Note supprimée",
      description: "Votre note a été supprimée",
    });
  };

  const handleEditEntry = (id: string, content: string) => {
    setEntries(
      entries.map(entry =>
        entry.id === id ? { ...entry, content } : entry
      )
    );
    
    toast({
      title: "Note modifiée",
      description: "Votre note a été mise à jour",
    });
  };

  const moodOptions = [
    "Joyeux", "Serein", "Inspiré", "Reconnaissant", 
    "Confus", "Stressé", "Fatigué", "Mélancolique"
  ];

  return (
    <Layout>
      <div className="pt-16 pb-20">
        <Navbar />
        
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-between items-center mb-6 mt-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <BookOpen className="mr-2" size={24} />
                Journal intérieur
              </h1>
              <p className="text-muted-foreground">
                Notez vos réflexions et votre parcours
              </p>
            </div>
            
            <button
              onClick={() => setShowNewEntryForm(!showNewEntryForm)}
              className="p-2 rounded-full bg-guidia-pink/10 text-guidia-pink-dark hover:bg-guidia-pink/20 transition-colors"
            >
              <PlusCircle size={24} />
            </button>
          </div>
          
          {showNewEntryForm && (
            <div className="guidia-card mb-6">
              <h2 className="font-medium mb-4">Nouvelle note</h2>
              <form onSubmit={handleCreateEntry}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Comment vous sentez-vous?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setNewEntryMood(mood)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newEntryMood === mood
                            ? "bg-guidia-pink text-white"
                            : "bg-muted hover:bg-guidia-pink/10"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="entry-content" className="block text-sm font-medium text-muted-foreground mb-1">
                    Votre note
                  </label>
                  <textarea
                    id="entry-content"
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    placeholder="Qu'avez-vous découvert aujourd'hui?"
                    className="guidia-textarea min-h-[120px]"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNewEntryForm(false)}
                    className="px-4 py-2 rounded-lg border border-guidia-pink/30 text-foreground hover:bg-guidia-pink/10 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-guidia-pink text-white hover:bg-guidia-pink-dark transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="space-y-4">
            {entries.map(entry => (
              <JournalCard 
                key={entry.id}
                id={entry.id}
                date={entry.date}
                content={entry.content}
                mood={entry.mood}
                onDelete={handleDeleteEntry}
                onEdit={handleEditEntry}
              />
            ))}
            
            {entries.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Votre journal est vide. Créez votre première note!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
