import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Reviews from "./components/Reviews";
import Featured from "./components/Featured";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Landing />
      <Featured />
      <Gallery />
    </main>
  );
}
