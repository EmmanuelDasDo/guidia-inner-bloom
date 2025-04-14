
import { useState } from "react";
import { Calendar, Edit2, Save, Trash2 } from "lucide-react";

interface JournalEntryProps {
  id: string;
  date: Date;
  content: string;
  mood?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, content: string) => void;
}

const JournalCard: React.FC<JournalEntryProps> = ({
  id,
  date,
  content,
  mood,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (onEdit) {
      onEdit(id, editedContent);
    }
    setIsEditing(false);
  };

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="guidia-card h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center text-muted-foreground">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-1 text-guidia-green-dark hover:bg-guidia-green/10 rounded-full transition-colors"
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-guidia-pink/10 rounded-full transition-colors"
            >
              <Edit2 size={18} />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
      
      {mood && (
        <div className="mb-3 px-3 py-1 inline-block bg-guidia-yellow/20 rounded-full text-sm">
          {mood}
        </div>
      )}
      
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="guidia-textarea min-h-[100px]"
          autoFocus
        />
      ) : (
        <p className="text-foreground/90 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
};

export default JournalCard;
