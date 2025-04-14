
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import MonCheminSection from "@/components/MonCheminSection";

const MonChemin = () => {
  return (
    <Layout>
      <div className="pt-16 pb-20">
        <Navbar />
        
        <div className="max-w-lg mx-auto">
          <MonCheminSection />
        </div>
      </div>
    </Layout>
  );
};

export default MonChemin;
