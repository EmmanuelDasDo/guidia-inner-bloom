
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <Layout>
      <div className="pt-16">
        <Navbar />
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
