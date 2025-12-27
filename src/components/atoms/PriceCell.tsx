import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  price: number;
}

export const PriceCell = ({ price }: PriceCellProps) => {
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);
  const prevPriceRef = useRef(price);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    if (price !== prevPrice) {
      if (price > prevPrice) setFlash('green');
      else if (price < prevPrice) setFlash('red');
      
      prevPriceRef.current = price;
      const timer = setTimeout(() => setFlash(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [price]);

  return (
    <span className={cn(
      "transition-colors duration-500 font-mono px-1 rounded-sm",
      flash === 'green' && "text-green-400 bg-green-400/10",
      flash === 'red' && "text-red-400 bg-red-400/10",
      !flash && "text-white"
    )}>
      ${price.toFixed(4)}
    </span>
  );
};