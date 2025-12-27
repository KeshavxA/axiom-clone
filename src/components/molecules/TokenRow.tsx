import { memo } from 'react';
import { Token } from '@/types/token';
import { PriceCell } from '@/components/atoms/PriceCell';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TokenRowProps {
  token: Token;
  index: number;
}

const TokenRow = memo(({ token, index }: TokenRowProps) => {
  const isPositive = token.change24h >= 0;
  const formatVolume = (vol: number) => {
    if (vol >= 1_000_000_000) return `$${(vol / 1_000_000_000).toFixed(2)}B`;
    return `$${(vol / 1_000_000).toFixed(2)}M`;
  };

  return (
    <tr 
      className={cn(
        "border-b border-white/5 transition-colors hover:bg-white/5 group cursor-pointer",
        index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
      )}
    >
    
      <td className="py-4 pl-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 border border-indigo-500/30">
            {token.symbol[0]}
          </div>
          <div>
            <div className="font-medium text-white text-sm">{token.name}</div>
            <div className="text-xs text-gray-500 font-mono">{token.symbol}</div>
          </div>
        </div>
      </td>
      <td className="text-right text-sm">
        <PriceCell price={token.price} />
      </td>
      <td className="text-right">
        <div className={cn(
          "flex items-center justify-end gap-1 text-sm font-medium",
          isPositive ? "text-green-400" : "text-red-400"
        )}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(token.change24h).toFixed(2)}%
        </div>
      </td>
      <td className="text-right text-gray-400 font-mono text-sm hidden sm:table-cell">
        {formatVolume(token.volume24h)}
      </td>
      <td className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                 Trade <span className="text-indigo-400">{token.name}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex flex-col gap-1 bg-black/40 p-4 rounded-lg border border-white/5">
                 <span className="text-xs text-gray-500 uppercase tracking-wider">Current Price</span>
                 <span className="font-mono text-2xl font-medium">${token.price.toFixed(6)}</span>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]">
                  Buy {token.symbol}
                </button>
                <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-bold py-3 rounded-lg transition-all">
                  Sell {token.symbol}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}, (prev, next) => {
  return (
    prev.token.price === next.token.price &&
    prev.token.change24h === next.token.change24h &&
    prev.token.volume24h === next.token.volume24h
  );
});

export default TokenRow;