import Navbar from "./components/navbar/Navbar";
import LandingPage from "./components/landingPage/LandingPage";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </>
  );
}
