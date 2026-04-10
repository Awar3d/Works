export interface ButtonProps {
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
    children: React.ReactNode;
    contentStyle?: TextStyle;
    onPress?: () => void;
}