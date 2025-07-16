import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-800">我是首頁。</p>
        </div>
      </div>
    </div>
  );
}

export default Home;