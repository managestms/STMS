"use client"

export default function Sidebar({ activePage, onPageChange }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "addLocals", label: "Add Locals" },
    { id: "addRawImli", label: "Add Raw Imli" },
    { id: "assignImli", label: "Assign Imli" },
    { id: "imliReturned", label: "Imli Returned" },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">SITMS PORTAL</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
              activePage === item.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-gray-200 p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          </svg>
          Settings
        </button>
      </div>
    </aside>
  )
}
