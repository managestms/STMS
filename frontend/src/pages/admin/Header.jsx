import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../../context/ThemeContext'

const Header = ({ title }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white px-8 py-3 flex items-center justify-between h-[64px] border-b border-gray-200 transition-colors duration-300">
      <div className="flex items-center gap-3 w-full">
        <span className="text-orange-600 text-xl font-bold">»</span>
        <h2 className="text-xl font-bold tracking-wide truncate text-orange-600 uppercase text-sm">{title}</h2>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <MdLightMode className="text-xl text-orange-500" /> : <MdDarkMode className="text-xl" />}
      </button>
    </header>
  )
}

export default Header

