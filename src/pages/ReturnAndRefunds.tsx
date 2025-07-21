import { useState } from "react";
import { ChevronDown, Package, Clock, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function ReturnAndRefunds() {
  const [activeTab, setActiveTab] = useState("policy");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const tabs = [
    { id: "policy", label: "退換貨政策", icon: Package },
    { id: "process", label: "退換貨流程", icon: Clock },
    { id: "refund", label: "退款說明", icon: CreditCard },
    { id: "faq", label: "常見問題", icon: AlertCircle },
  ];
  const returnConditions = [
    { 
      icon: CheckCircle, 
      title: "退換貨條件", 
      items: [
        "商品收到後 7 天內提出申請。",
        "商品保持全新狀態，未使用、未損壞、吊牌未拆剪。",
        "包裝需完整，且包含所有配件和贈品。",
        "保留發票或收據簽單。",
        "非客製化商品。",
      ],
      color: "text-green-600"
    },
    { 
      icon: XCircle, 
      title: "不符合退換貨條件", 
      items: [
        "已超過 7 天退換貨期限。",
        "商品已使用或有明顯使用痕跡、髒污、吊牌已拆剪。",
        "包裝損壞或配件不齊全。",
        "客製化或個人化商品。",
        "發票或收據簽單遺失。",
        "特價商品。",
      ],
      color: "text-red-600"
    }
  ];
  const processSteps = [
    {
      step: 1,
      title: "臨櫃申請/專人到府收貨",
      description: "臨櫃申請請攜帶商品及發票至門市辦理。\n專人到府收貨請登入會員中心，選擇退換貨的商品，填寫退換貨申請表。",
    },
    {
      step: 2,
      title: "審核申請",
      description: "客服團隊將在 24 小時內審核您的申請，並透過 Email 通知結果。",
    },
    {
      step: 3,
      title: "寄回商品",
      description: "收到核准通知後，專人會依照指定時間前往約定地點收貨。",
    },
    {
      step: 4,
      title: "檢查商品",
      description: "收到退回商品後，我們將檢查商品狀態是否符合退換貨條件。",
    },
    {
      step: 5,
      title: "完成退款",
      description: "商品檢查無誤後，將依照原付款方式進行退款或換貨。",
    }
  ];
  const faqData = [
    {
      question: "退換貨需要付運費嗎？",
      answer: "如商品瑕疵或出貨錯誤，運費由我們負擔。如果是個人因素退換貨，運費需由客戶自行負擔。"
    },
    {
      question: "可以換成不同商品嗎？",
      answer: "可以！但需要補差價或退差價。換貨以同款式不同尺寸或顏色為優先。"
    },
    {
      question: "退款需要多久時間？",
      answer: "信用卡退款約 14 個工作天，實際時間依各金融機構作業時間而定。"
    },
    {
      question: "可以退換貨幾次？",
      answer: "每筆訂單最多可申請一次退換貨，換貨後的商品不再接受退換貨申請。"
    },
  ];
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  const TabContent = () => {
    switch (activeTab) {
      case "policy":
        return (
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">退換貨期限</h3>
              <p className="text-blue-800">
                商品收到後 
                <span className="font-bold">7 天內</span> 可申請退換貨，逾期恕不受理。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {returnConditions.map((condition, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <condition.icon className={`${condition.color} mr-3`} size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">{condition.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "process":
        return (
          <div className="space-y-8">
            <div className="relative">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-6">{step.step}</div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-2 whitespace-pre-line">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "refund":
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">退款方式說明</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CreditCard className="text-yellow-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-yellow-800">信用卡付款</h4>
                    <p className="text-yellow-700">退款回原交易信用卡，約 14 個工作天。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">退款金額計算</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">商品金額</span>
                  <span className="font-medium">全額退費</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">運費</span>
                  <span className="font-medium">視情況而定</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span className="text-gray-900">退款總額</span>
                  <span className="text-orange-600">依實際情況計算</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50" onClick={() => toggleFaq(index)}>
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`transform transition-transform ${expandedFaq === index ? "rotate-180" : ""}`} size={20}/>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="http://localhost:5173/" className="hover:text-orange-500">首頁</a>
            <span>＞</span>
            <span className="text-orange-500">退換貨政策</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">退換貨政策</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                <tab.icon className="mr-2" size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <TabContent />
          </div>

          <div className="mt-12 bg-orange-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">還有疑問嗎？</h2>
            <p className="text-gray-600 mb-6">如果您對退換貨政策有任何疑問，歡迎隨時與我們的團隊聯繫。</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://github.com/dali1756" target="_blank" className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">聯絡我們</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReturnAndRefunds;
