import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Landing />
      <Featured />
      <Gallery />
      <Footer />
    </main>
  );
}
