import Navbar from "@/app/components/Navbar"; // ✅ Import Navbar
import AllProducts from "@/app/components/Allproducts";

export default function ProductsPage() {
  return (
    <main>
      <Navbar /> {/* ✅ Add Navbar here */}
      <AllProducts />
    </main>
  );
}
