"use client"
import ScrollReveal from '../ui/ScrollReveal'
import Card3D from '../ui/Card3D'
import {
    MdInventory,
    MdPeople,
    MdAnalytics,
    MdTrendingUp
} from 'react-icons/md'

const FeaturesSection = () => {
    const features = [
        {
            icon: MdInventory,
            title: "Stock Management",
            description: "Track raw and cleaned tamarind inventory with real-time updates and smart stock alerts"
        },
        {
            icon: MdPeople,
            title: "Vendor Management",
            description: "Manage your network of local vendors, assign stock, and track their cleaning progress"
        },
        {
            icon: MdAnalytics,
            title: "Analytics & Reports",
            description: "Gain insights with detailed dashboards showing stock flow, vendor performance, and sales"
        },
        {
            icon: MdTrendingUp,
            title: "Business Growth",
            description: "Scale your operations efficiently with our comprehensive management tools"
        }
    ]

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
                        Powerful <span className="text-[#ff741f]">Features</span>
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                        Everything you need to manage your tamarind trading business
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <ScrollReveal key={index} delay={index * 0.15}>
                                <Card3D>
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full group relative overflow-hidden">
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff741f]/0 to-[#ff9b54]/0 group-hover:from-[#ff741f]/5 group-hover:to-[#ff9b54]/5 transition-all duration-500 rounded-2xl" />

                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-gradient-to-br from-[#ff741f] to-[#ff9b54] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/50">
                                                <IconComponent className="text-2xl text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#ff741f] transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card3D>
                            </ScrollReveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection
