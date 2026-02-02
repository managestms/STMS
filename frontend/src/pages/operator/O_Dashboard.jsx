import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../../context/ThemeContext'

function O_Dashboard() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Operator Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-[#ff741f] text-xl font-bold">»</span>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Operator Dashboard</h1>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-all duration-300"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>
      </header>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Welcome, Operator</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            This is the protected operator dashboard area. The theme toggle above allows you to switch between light and dark modes.
          </p>
        </div>
      </div>
    </div>
  )
}
export default O_Dashboard
