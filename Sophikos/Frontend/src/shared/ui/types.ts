export interface ButtonProps {
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
    children: React.ReactNode;
    contentStyle?: TextStyle;
    onPress?: () => void;
}

export interface CardProps {
    total: number;
    available: number;
    unavailable: number;
}