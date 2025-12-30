const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </header>
  )
}

export default Header
