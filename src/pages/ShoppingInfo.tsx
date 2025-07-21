import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function ShoppingInfos() {
  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">運送資訊</h1>
        <div className="space-y-6 text-gray-700 leading-relaxed text-base">
          <section>
            <h2 className="text-xl font-semibold mb-2">運送方式</h2>
            <p>我們提供宅配、7-11店到店、全家店到店服務進行商品配送，確保您的訂單能安全、準時送達。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">出貨時間</h2>
            <p>
              訂單確認後，將於 1～3 個工作天內完成出貨（不含例假日與國定假日）。
              若遇商品缺貨或延遲，客服將主動與您聯繫。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">運費計算</h2>
            <ul className="list-disc pl-5">
              <li>單筆訂單金額滿 NT$1000 免運費。</li>
              <li>未滿 NT$1000，酌收運費 NT$60。</li>
              <li>偏遠地區及外島需額外加收運費，將由客服另行通知。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">配送時間</h2>
            <p>配送時間依地區而異，一般約莫 1～3 天可送達。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">注意事項</h2>
            <ul className="list-disc pl-5">
              <li>請確保提供的地址與聯絡資訊正確，以避免商品無法配送。</li>
              <li>如需退換貨請參考<Link to="/returns" className="text-orange-600 underline hover:text-orange-800 ml-1">退換貨政策</Link>。</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingInfos;