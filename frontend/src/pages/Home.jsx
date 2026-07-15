import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl font-bold mb-4">
          AI Powered Travel Planning
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Organize trips, generate itineraries,
          manage destinations and plan smarter.
        </p>

        <div className="mt-8">
          <Link to="/register" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
