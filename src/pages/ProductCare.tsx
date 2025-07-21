import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function ProductCare() {
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-8">商品保養指南</h1>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">服飾保養</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>洗滌前請參考洗標指示，依照材質選擇合適洗滌方式。</li>
            <li>有印花或刺繡的商品，請翻面並裝入洗衣袋中清洗。</li>
            <li>避免過度高溫水洗、烘乾，以防縮水或變形。</li>
            <li>晾曬時避免陽光直射，可於陰涼處自然風乾。</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">皮件保養</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>建議定期使用皮革保養油擦拭，保持皮面柔軟與光澤。</li>
            <li>如遇雨水，應立即用乾布擦乾並陰乾，勿使用吹風機。</li>
            <li>避免長時間日曬或靠近熱源，以防皮革乾裂褪色。</li>
            <li>未使用時請放入防塵袋，並保持通風乾燥。</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">麂皮保養</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>若不慎弄濕，請用紙巾吸乾後陰乾，切勿曝曬進而在成商品損壞。</li>
            <li>存放前請裝入紙袋或透氣防塵袋，避免擠壓變形。</li>
            <li>可使用麂皮專用清潔刷去除灰塵，保持質感。</li>
            <li>避免碰水與油污，麂皮遇濕容易變色。</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">飾品保養</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>避免直接觸香水、化妝品、汗水與水氣，以防止氧化變色。</li>
            <li>建議單獨存放於夾鏈袋或飾品盒中，避免刮傷。</li>
            <li>配戴完畢可使用拭銀布或乾布擦拭後收納。</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">銀飾保養</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>建議每日配戴，有助於銀飾維持亮度及產生獨特的氧化樣式。</li>
            <li>純銀飾品容易產生氧化，請避免長時間接觸空氣與水分。</li>
            <li>若氧化嚴重，可使用中性清潔劑稀釋清洗後擦乾。</li>
            <li>可使用拭銀布輕輕擦拭表面恢復光澤。</li>
          </ul>
        </section>
        <div className="mt-12 bg-orange-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">延長商品壽命，從正確の保養開始。</h2>
          <p className="text-gray-700">若您有其他保養相關問題，歡迎透過<Link to="/contacts" className="text-orange-600 underline hover:text-orange-800 ml-1">聯絡我們</Link>與我們進行聯繫。</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductCare;