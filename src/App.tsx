
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Bilan from "./pages/Bilan";
import Journal from "./pages/Journal";
import MonChemin from "./pages/MonChemin";
import Chat from "./pages/Chat";
import Audio from "./pages/Audio";
import Abonnements from "./pages/Abonnements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bilan" element={<Bilan />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mon-chemin" element={<MonChemin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/abonnements" element={<Abonnements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
