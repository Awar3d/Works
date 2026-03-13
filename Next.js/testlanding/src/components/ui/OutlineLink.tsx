interface Props {
    href: string
    children: React.ReactNode
}

export default function OutlineLink({ href, children }: Props) {
    return (
        <a href={href} className="px-6 py-2.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200">
            {children}
        </a>
    )
}
