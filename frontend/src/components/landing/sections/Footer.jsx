const Footer = () => {
    return (
        <footer className="py-12 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-3 mb-6 md:mb-0">
                        <img
                            src="/stms-logo.svg"
                            alt="Super Imli Traders"
                            className="h-10 w-auto filter brightness-0 invert"
                        />
                        <span className="text-xl font-bold">Super Imli Traders</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2025 Super Imli Traders. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
