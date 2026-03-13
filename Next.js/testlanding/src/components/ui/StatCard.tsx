interface Props {
    label: string
    value: string
    trend: string
    trendClassName: string
    className?: string
}

export default function StatCard({ label, value, trend, trendClassName, className }: Props) {
    return (
        <div className={`glass-card px-5 py-4 ${className ?? ""}`}>
            <p className="text-gray-500 text-xs mb-1">{label}</p>
            <p className="text-white font-bold text-xl">{value}</p>
            <p className={`text-xs mt-1 ${trendClassName}`}>{trend}</p>
        </div>
    )
}
