import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

interface Shop {
  name: string;
  address: string;
  image: string;
}

// 假資料
const shops: Shop[] = [
  {
    name: "BUYBYE 台北",
    address: "台北市松山區富錦街340號",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE 微風南山",
    address: "台北市信義區松智路17號3樓 微風南山",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE LaLaport 台中",
    address: "台中市東區進德路600號2樓 Mitsui Shopping Park LaLaport 台中 北館",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE 誠品生活南西",
    address: "台北市中山區南京西路14號1樓 誠品生活南西店",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE 新光三越 DIAMOND TOWERS",
    address: "台北市大安區忠孝東路三段268號3樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE LaLaport 南港",
    address: "台北市南港區經貿二路131號2樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE 新光三越 台南新天地",
    address: "台南市中西區西門路一段658號2樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE U.I.J HOTEL & HOSTEL",
    address: "台南市中西區友愛街115巷5-1號 友愛街旅館",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE 勤美 誠品綠園道",
    address: "台中市西區公益路68號1樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE OUTLET 林口",
    address: "新北市林口區文化三路一段356號1樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE OUTLET POP-UP SHOP 台中港",
    address: "台中市梧棲區台灣大道十段168號 MITSUI OUTLET PARK 台中港",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE OUTLET POP-UP SHOP 台南",
    address: "台南市歸仁區歸仁大道101號 MITSUI OUTLET PARK 台南 1樓",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "B:MING by BUYBYE POP-UP SHOP",
    address: "台北市信義區松智路17號3樓 微風南山",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "BUYBYE GOLF POP-UP SHOP 新光三越A9",
    address: "台北市信義區松壽路9號 新光三越A9 4樓",
    image: "https://picsum.photos/200/300",
  },
];

function Shops() {
  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">店舖資訊</h1>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop, index) => (
            <div key={index} className="flex flex-col">
              <img src={shop.image} alt={shop.name} className="rounded-lg shadow-md object-cover w-full h-40"/>
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{shop.name}</h2>
                <p className="text-gray-600 text-sm">{shop.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    <Footer />
    </>
  )
}

export default Shops;
