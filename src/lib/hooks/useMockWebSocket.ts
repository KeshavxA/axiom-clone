import { useState, useEffect } from 'react';
import { Token } from '@/types/token';

export const useMockWebSocket = (initialData: Token[]) => {
  const [data, setData] = useState<Token[]>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setData((currentData) =>
        currentData.map((token) => {
          const volatility = 0.002; 
          const change = 1 + (Math.random() * volatility * 2 - volatility);
          
          return {
            ...token,
            price: token.price * change,
            change24h: token.change24h + (change > 1 ? 0.1 : -0.1),
          };
        })
      );
    }, 2000); 

    return () => clearInterval(interval);
  }, [data.length]); 

  return data;
};