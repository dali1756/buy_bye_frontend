import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScrollTop from "../components/ScrollTop";

function SizeInfos() {
  return (
    <>
      <NavBar />
      <ScrollTop/>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">尺寸指南</h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">上衣（男 / 女通用參考）</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">尺寸</th>
                  <th className="border px-4 py-2">胸圍 (cm)</th>
                  <th className="border px-4 py-2">肩寬 (cm)</th>
                  <th className="border px-4 py-2">衣長 (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">S</td>
                  <td className="border px-4 py-2">86 – 92</td>
                  <td className="border px-4 py-2">40 – 44</td>
                  <td className="border px-4 py-2">65 – 68</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">M</td>
                  <td className="border px-4 py-2">92 – 98</td>
                  <td className="border px-4 py-2">44 – 46</td>
                  <td className="border px-4 py-2">68 – 72</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">L</td>
                  <td className="border px-4 py-2">98 – 104</td>
                  <td className="border px-4 py-2">46 – 48</td>
                  <td className="border px-4 py-2">72 – 75</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">XL</td>
                  <td className="border px-4 py-2">104 – 110</td>
                  <td className="border px-4 py-2">48 – 51</td>
                  <td className="border px-4 py-2">75 – 78</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">下身</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">尺寸</th>
                  <th className="border px-4 py-2">腰圍 (cm)</th>
                  <th className="border px-4 py-2">臀圍 (cm)</th>
                  <th className="border px-4 py-2">褲長 (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">S</td>
                  <td className="border px-4 py-2">70 – 76</td>
                  <td className="border px-4 py-2">88 – 94</td>
                  <td className="border px-4 py-2">95 – 98</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">M</td>
                  <td className="border px-4 py-2">76 – 82</td>
                  <td className="border px-4 py-2">94 – 100</td>
                  <td className="border px-4 py-2">98 – 102</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">L</td>
                  <td className="border px-4 py-2">82 – 88</td>
                  <td className="border px-4 py-2">100 – 106</td>
                  <td className="border px-4 py-2">102 – 106</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">鞋類</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">歐規 (EU)</th>
                  <th className="border px-4 py-2">日規 (JP / cm)</th>
                  <th className="border px-4 py-2">美規男 (US Men)</th>
                  <th className="border px-4 py-2">美規女 (US Women)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">39</td>
                  <td className="border px-4 py-2">24.5</td>
                  <td className="border px-4 py-2">6.5</td>
                  <td className="border px-4 py-2">8</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">40</td>
                  <td className="border px-4 py-2">25</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8.5</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">41</td>
                  <td className="border px-4 py-2">26</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9.5</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">42</td>
                  <td className="border px-4 py-2">26.5</td>
                  <td className="border px-4 py-2">8.5</td>
                  <td className="border px-4 py-2">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12 bg-orange-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">※ 尺寸略有差異，此表格為參考用途，實際以商品標示為主。</h2>
          <p className="text-gray-700">若有商品尺寸選擇上的任何疑問，歡迎至 <a href="/contacts" className="text-orange-600 underline hover:text-orange-800">聯絡我們</a> 與我們進行聯繫。</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SizeInfos;
