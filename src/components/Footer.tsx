function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">關於 BuyBye</h3>
            <p className="text-gray-400 text-sm">說書人。</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">客戶服務</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">聯絡我們</a></li>
              <li><a href="#" className="hover:text-white transition-colors">運送資訊</a></li>
              <li><a href="#" className="hover:text-white transition-colors">退換貨政策</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">購物指南</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">尺寸指南</a></li>
              <li><a href="#" className="hover:text-white transition-colors">穿搭建議</a></li>
              <li><a href="#" className="hover:text-white transition-colors">保養方式</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">追蹤我們</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/dali1756" target="_blank" className="text-gray-400 hover:text-white">
                <i className="fa-brands fa-github"></i>
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
