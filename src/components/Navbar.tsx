
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-guidia-pink/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-heading font-bold bg-gradient-to-r from-guidia-pink-dark to-guidia-orange-dark bg-clip-text text-transparent">
            Guidia
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-foreground/80 hover:text-guidia-pink-dark transition">
            Accueil
          </Link>
          <Link to="/mon-chemin" className="text-foreground/80 hover:text-guidia-pink-dark transition">
            Mon Chemin
          </Link>
          <Link to="/journal" className="text-foreground/80 hover:text-guidia-pink-dark transition">
            Journal
          </Link>
          <Link to="/abonnements" className="text-foreground/80 hover:text-guidia-pink-dark transition">
            Abonnements
          </Link>
          <Link to="/profile" className="p-2 rounded-full bg-guidia-pink/10 text-foreground">
            <User size={20} />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-guidia-pink/20">
          <div className="px-4 py-3 space-y-2">
            <Link 
              to="/dashboard" 
              className="block py-2 px-4 rounded-lg hover:bg-guidia-pink/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/mon-chemin" 
              className="block py-2 px-4 rounded-lg hover:bg-guidia-pink/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Mon Chemin
            </Link>
            <Link 
              to="/journal" 
              className="block py-2 px-4 rounded-lg hover:bg-guidia-pink/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              to="/abonnements" 
              className="block py-2 px-4 rounded-lg hover:bg-guidia-pink/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Abonnements
            </Link>
            <Link 
              to="/profile" 
              className="block py-2 px-4 rounded-lg hover:bg-guidia-pink/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Profil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
