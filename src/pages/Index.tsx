
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
};

export default Index;
