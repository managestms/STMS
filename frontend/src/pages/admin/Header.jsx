import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../../context/ThemeContext'

const Header = ({ title }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-gradient-to-b from-white to-gray-50 px-6 py-3 flex items-center justify-between h-[64px] shadow-xl transition-colors duration-300">
      <div className="flex items-center gap-3 w-full">
        <span className="text-[#ff741f] text-xl font-bold">»</span>
        <h2 className="text-xl font-semibold tracking-wide truncate text-[#ff741f]">{title}</h2>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm transition-all duration-300"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
      </button>
    </header>
  )
}

export default Header

