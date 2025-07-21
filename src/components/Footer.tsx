import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const handleContactUs = () => {
    navigate("/contacts");
  };
  const handleReturns = () => {
    navigate("/returns")
  }
  const handleShoppings = () => {
    navigate("/shoppings");
  }
  const handleCare = () => {
    navigate("/cares");
  }
  const handleSize = () => {
    navigate("/sizes");
  }

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">關於 BuyBye</h3>
            <p className="text-gray-400 text-sm">天橋下の說書人。</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">客戶服務</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={handleContactUs} className="hover:text-white transition-colors text-left">聯絡我們</button>
              </li>
              <li>
                <button onClick={handleShoppings} className="hover:text-white transition-colors text-left">運送資訊</button>
              </li>
              <li>
                <button onClick={handleReturns} className="hover:text-white transition-colors text-left">退換貨政策</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">購物指南</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={handleSize} className="hover:text-white transition-colors text-left">尺寸指南</button>
              </li>
              <li>
                <a href="https://www.beams.tw/staff/" target="_blank" className="hover:text-white transition-colors">穿搭建議</a>
              </li>
              <li>
                <button onClick={handleCare} className="hover:text-white transition-colors text-left">保養方式</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">追蹤我們</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/dali1756" target="_blank" className="text-gray-400 hover:text-white">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://hackmd.io/@JeterYu" target="_blank" className="text-gray-400 hover:text-white">
                <i className="fa-solid fa-file-alt text-2xl" title="HackMD"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 BUYBYE. 版權所有.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
