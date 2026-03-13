interface Props {
    icon: string
    title: string
    description: string
    iconBg: string
    hoverBorder: string
}

export default function FeatureCard({ icon, title, description, iconBg, hoverBorder }: Props) {
    return (
        <div className={`glass-card p-7 flex flex-col gap-4 ${hoverBorder} transition-colors duration-200`}>
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-xl`}>
                {icon}
            </div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    )
}
