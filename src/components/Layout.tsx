
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart4, MessageCircle, Music } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Hide navbar on the homepage and bilan page
  const hideNavbar = location.pathname === "/" || location.pathname === "/bilan";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      
      {!hideNavbar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-guidia-pink/20 p-2 z-10">
          <div className="max-w-md mx-auto flex justify-around items-center">
            <NavItem icon={<Home size={22} />} to="/dashboard" label="Accueil" active={location.pathname === "/dashboard"} />
            <NavItem icon={<MessageCircle size={22} />} to="/chat" label="Guide" active={location.pathname === "/chat"} />
            <NavItem icon={<BarChart4 size={22} />} to="/mon-chemin" label="Mon Chemin" active={location.pathname === "/mon-chemin"} />
            <NavItem icon={<BookOpen size={22} />} to="/journal" label="Journal" active={location.pathname === "/journal"} />
            <NavItem icon={<Music size={22} />} to="/audio" label="Audio" active={location.pathname === "/audio"} />
          </div>
        </nav>
      )}
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, to, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
        active 
          ? "text-guidia-pink-dark" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <div className={`${active ? "bg-guidia-pink/20 p-2 rounded-full" : ""}`}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Layout;
