import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

interface Brand {
    name: string;
}

// 假資料
const brands: Brand[] = [
  {
    name: "NIKE",
  },
  {
    name: "Adidas",
  },
  {
    name: "Puma",
  },
  {
    name: "Ape",
  },
  {
    name: "Apple",
  },
  {
    name: "New Balance",
  },
  {
    name: "ASICS",
  },
  {
    name: "On",
  }
]

function Brands() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">品牌總覽</h1>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col">
              <div className="mt-4">
                <a href="#" className="text-xl font-semibold">{brand.name}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Brands;
