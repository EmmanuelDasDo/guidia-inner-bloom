
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Abonnements = () => {
  return (
    <Layout>
      <div className="pt-16 pb-20">
        <Navbar />
        <SubscriptionPlans />
      </div>
    </Layout>
  );
};

export default Abonnements;
