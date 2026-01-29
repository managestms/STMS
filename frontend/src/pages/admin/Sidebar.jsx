"use client"

export default function Sidebar({ activePage, onPageChange, isCollapsed, onToggle }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "addLocals", label: "Add Locals", icon: "👥" },
    { id: "addRawImli", label: "Add Raw Imli", icon: "🌿" },
    { id: "assignImli", label: "Assign Imli", icon: "📋" },
    { id: "imliReturned", label: "Imli Returned", icon: "↩️" },
    { id: "localsProfile", label: "Locals Profile", icon: "👤" },
  ]

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-white via-gray-50 to-gray-100 border-r border-gray-200/50 h-screen flex flex-col flex-shrink-0 shadow-xl transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className={`${isCollapsed ? 'px-2' : 'px-6'} py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-[80px] flex items-center shadow-lg relative overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        {isCollapsed ? (
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center">
              <img 
                src="/stms-logo.svg" 
                alt="SITMS Portal" 
                className="h-6 w-auto filter brightness-0 invert"
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center">
              <img 
                src="/stms-logo.svg" 
                alt="SITMS Portal" 
                className="h-6 w-auto filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white/95 tracking-wide">SITMS</h1>
              <p className="text-xs text-white/70 font-medium">Management Portal</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className={`flex-1 ${isCollapsed ? 'px-1' : 'px-3'} py-6 space-y-1 overflow-y-auto transition-all duration-300`}>
        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => onPageChange(item.id)}
              className={`w-full text-left ${isCollapsed ? 'px-0 py-3 justify-center' : 'px-4 py-3.5'} rounded-xl font-medium transition-all duration-200 group flex items-center gap-3 ${
                activePage === item.id 
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 scale-[1.02]" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 justify-center w-full">
                {isCollapsed ? (
                  <span className="text-lg">{item.icon}</span>
                ) : (
                  <>
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                  </>
                )}
              </div>
            </button>
            {isCollapsed && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className={`border-t border-gray-200/50 ${isCollapsed ? 'p-1' : 'p-3'} bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300`}>
        <div className="relative group">
          <button className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3.5'} rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 transition-all duration-200 group hover:shadow-sm`}>
            {isCollapsed ? (
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-200">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-200">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-gray-500 group-hover:text-orange-600">Configure system</p>
                </div>
              </>
            )}
          </button>
          {isCollapsed && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Settings
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
