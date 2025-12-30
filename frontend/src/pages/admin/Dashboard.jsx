const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Raw Imli",
      titleUrdu: "اِمّی الا",
      value: "78045 KG",
      color: "border-green-600",
      icon: "🌿",
    },
    {
      id: 2,
      title: "Cleaned Imli",
      titleUrdu: "صاف الا",
      value: "78045 KG",
      color: "border-amber-700",
      icon: "🫘",
    },
    {
      id: 3,
      title: "Distributed Imli to Locals",
      titleUrdu: "مقسم شدہ الا",
      value: "78045 KG",
      color: "border-orange-600",
      icon: "📋",
    },
    {
      id: 4,
      title: "Pending Imli to be returned",
      titleUrdu: "اِمّی الا",
      value: "78045 KG",
      color: "border-pink-500",
      icon: "🔄",
    },
  ]

  const activities = [
    {
      title: "LATEST ENTRIES",
      items: [
        { description: "1500 KG RAW IMLI ADDED IN STOCK", date: "27th September 2025" },
        { description: "1200 KG RAW IMLI ADDED IN STOCK", date: "27th September 2025" },
        { description: "1200 KG RAW IMLI ADDED IN STOCK", date: "27th September 2025" },
      ],
    },
    {
      title: "RETURN CLEAN IMLI",
      items: [
        { description: "1500 KG CLEANED IMLI RETURNED BY CLEANER 343", date: "27th September 2025" },
        { description: "1900 KG CLEANED IMLI RETURNED BY CLEANER 313", date: "27th September 2025" },
        { description: "2000 KG CLEANED IMLI RETURNED BY CLEANER 313", date: "27th September 2025" },
      ],
    },
    {
      title: "ASSIGNMENT",
      items: [
        { description: "800 KG RAW IMLI ASSIGNED TO CLEANER 543", date: "27th September 2025" },
        { description: "800 KG RAW IMLI ASSIGNED TO CLEANER 543", date: "27th September 2025" },
        { description: "800 KG RAW IMLI ASSIGNED TO CLEANER 543", date: "27th September 2025" },
      ],
    },
  ]

  return (
    <div className="p-8 bg-gray-100 ml-60 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg p-6 border-l-4" style={{ borderColor: stat.color }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-gray-400 text-xs">{stat.titleUrdu}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className={`text-3xl font-bold mb-2`} style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-gray-500 text-xs">Last Updated on 24th October 2025</p>
          </div>
        ))}
      </div>

      {/* Activities and Quick Actions */}
      <div className="grid grid-cols-3 w-308 gap-6 mb-8">
        {/* Activities */}
        <div className="col-span-2 bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">RECENT ACTIVITIES</h3>
          <div className="grid grid-cols-3 gap-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-sm mb-4">{activity.title}</h4>
                <div className="space-y-4">
                  {activity.items.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      <p className="text-gray-700 text-sm font-semibold mb-1">{item.description}</p>
                      <p className="text-gray-400 text-xs">{item.date}</p>
                    </div>
                  ))}
                </div>
                <button className="text-gray-800 font-bold text-xs mt-4 hover:text-gray-600">SEE ALL</button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">QUICK ACTIONS</h3>
          <div className="space-y-4">
            <button className="w-full border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-4xl mb-2">➕</span>
              <span className="text-sm font-semibold text-gray-900">Add Raw Imli in Stocks</span>
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2">⚙️</span>
                <span className="text-xs font-semibold text-gray-900">Assign Imli</span>
              </button>
              <button className="border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2">📦</span>
                <span className="text-xs font-semibold text-gray-900">Imli Cleaned</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
