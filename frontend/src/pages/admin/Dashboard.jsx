import {
  MdEco,
  MdCleaningServices,
  MdAssignment,
  MdPendingActions,
  MdAdd,
  MdSettings,
  MdInventory
} from 'react-icons/md';

const Dashboard = ({ navigateToAssignImli, onPageChange }) => {
  const stats = [
    {
      id: 1,
      title: "Raw Imli",
      titleUrdu: "اِمّی الا",
      value: "78045 KG",
      borderColor: "border-orange-500",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      icon: MdEco,
    },
    {
      id: 2,
      title: "Cleaned Imli",
      titleUrdu: "صاف الا",
      value: "78045 KG",
      borderColor: "border-green-500",
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      icon: MdCleaningServices,
    },
    {
      id: 3,
      title: "Distributed Imli to Locals",
      titleUrdu: "مقسم شدہ الا",
      value: "78045 KG",
      borderColor: "border-blue-500",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      icon: MdAssignment,
    },
    {
      id: 4,
      title: "Pending Imli to be returned",
      titleUrdu: "اِمّی الا",
      value: "78045 KG",
      borderColor: "border-purple-500",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      icon: MdPendingActions,
    },
  ];

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
  ];

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-l-4 ${stat.borderColor} hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-500 font-medium text-sm mb-1">
                    {stat.title}
                  </p>
                  <p className="urdu-ui text-gray-400 text-lg font-bold mb-1">
                    {stat.titleUrdu}
                  </p>
                </div>
                <div className={`${stat.iconBg} p-2.5 rounded-lg`}>
                  <IconComponent className={`text-xl ${stat.iconColor}`} />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <p className="text-gray-400 text-xs font-medium">
                      Updated: 24 Oct 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Activities
            </h3>
            <button className="text-orange-600 text-sm font-semibold hover:text-orange-700">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                  {activity.title}
                </h4>

                <div className="space-y-3">
                  {activity.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white p-3 rounded border border-gray-200 shadow-sm"
                    >
                      <p className="text-gray-800 text-xs font-semibold leading-relaxed mb-1">
                        {item.description}
                      </p>
                      <p className="text-gray-400 text-[10px] font-medium">
                        {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => onPageChange && onPageChange('addRawImli')}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              <MdAdd className="text-xl" />
              <span className="font-semibold text-sm">Add Raw Imli Stock</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onPageChange && onPageChange('assignImli')}
                className="bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <div className="bg-purple-50 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <MdSettings className="text-purple-600 text-lg" />
                </div>
                <span className="text-xs font-semibold">Assign Imli</span>
              </button>

              <button
                onClick={() => onPageChange && onPageChange('imliReturned')}
                className="bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  <MdInventory className="text-green-600 text-lg" />
                </div>
                <span className="text-xs font-semibold">Imli Cleaned</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
