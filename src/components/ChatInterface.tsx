
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, ArrowDown } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bonjour! Je suis Guidia, votre guide de bien-être personnalisé. Comment puis-je vous aider aujourd'hui?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if scroll is needed
  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
      const isScrollNeeded = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollDown(isScrollNeeded);
    };

    messagesContainer.addEventListener("scroll", handleScroll);
    return () => messagesContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate AI response
  const simulateResponse = (userMessage: string) => {
    const botResponses = [
      "Je comprends ce que vous traversez. Prenez un moment pour respirer profondément et connectez-vous à votre corps.",
      "Votre chemin intérieur est unique. Avez-vous essayé de pratiquer la gratitude quotidienne pour renforcer votre ancrage?",
      "Les émotions sont comme des vagues, elles viennent et repartent. Accueillez-les sans jugement.",
      "La nature peut être une grande source d'apaisement. Pourriez-vous prendre quelques minutes pour vous connecter au monde extérieur aujourd'hui?",
      "Parfois, le simple fait de mettre des mots sur ce que nous ressentons peut être libérateur. Voulez-vous explorer davantage cette sensation?",
      "La bienveillance envers soi-même est le début de toute guérison. Comment pourriez-vous vous offrir plus de compassion aujourd'hui?",
      "J'entends votre questionnement. Parfois, les réponses émergent du silence intérieur. Avez-vous essayé une courte méditation?",
    ];

    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === "") return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    simulateResponse(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div 
        id="messages-container"
        className="flex-grow overflow-y-auto p-4 space-y-4 relative"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-guidia-pink/20 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
        
        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 p-2 bg-guidia-pink/20 rounded-full hover:bg-guidia-pink/30 transition-colors"
          >
            <ArrowDown size={20} />
          </button>
        )}
      </div>
      
      <form
        onSubmit={handleSendMessage}
        className="border-t border-guidia-pink/20 p-4 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="guidia-input"
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-guidia-pink text-white hover:bg-guidia-pink-dark transition-colors"
            disabled={input.trim() === ""}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #F6B9C1;
          border-radius: 50%;
          display: inline-block;
          margin-right: 3px;
          animation: bounce 1.3s linear infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.15s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start space-x-2 max-w-[80%]">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-guidia-pink/20 flex items-center justify-center flex-shrink-0">
            <Bot size={16} />
          </div>
        )}
        
        <div
          className={`p-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-guidia-pink to-guidia-orange text-white"
              : "bg-white border border-guidia-pink/20 shadow-sm"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <div className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-guidia-pink to-guidia-orange flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
