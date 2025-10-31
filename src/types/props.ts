export interface CardProps {
  title: string;
  desc: string;
  img: string;
  arrow: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
