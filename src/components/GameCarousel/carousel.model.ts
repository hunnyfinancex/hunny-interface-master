export interface CarouselItem {
  key: number,
  content: any,
  onClick?: any
}

export interface CarouselProps {
  current: number;
  slides: CarouselItem[];
  goto: (i: number) => void;
}