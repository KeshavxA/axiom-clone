'use client';

import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMockWebSocket } from '@/lib/hooks/useMockWebSocket';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setSort } from '@/lib/redux/slices/tableSlice';
import TokenRow from '@/components/molecules/TokenRow';
import TableSkeleton from '@/components/molecules/TableSkeleton';
import { Token } from '@/types/token';
import { ArrowUpDown, Info, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const MOCK_DB_DATA: Token[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 64230.50, marketCap: 1200000000000, volume24h: 35000000000, change24h: 2.5, holders: 1000000, status: 'migrated', isNew: false },
  { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3450.20, marketCap: 400000000000, volume24h: 15000000000, change24h: -1.2, holders: 800000, status: 'migrated', isNew: false },
  { id: '3', name: 'Solana', symbol: 'SOL', price: 145.60, marketCap: 65000000000, volume24h: 4000000000, change24h: 5.8, holders: 500000, status: 'final', isNew: false },
  { id: '4', name: 'Axiom', symbol: 'AXM', price: 1.20, marketCap: 10000000, volume24h: 500000, change24h: 12.5, holders: 2500, status: 'new', isNew: true },
  { id: '5', name: 'Dogecoin', symbol: 'DOGE', price: 0.16, marketCap: 22000000000, volume24h: 1000000000, change24h: -0.5, holders: 3000000, status: 'migrated', isNew: false },
  { id: '6', name: 'Pepe', symbol: 'PEPE', price: 0.000005, marketCap: 3000000000, volume24h: 500000000, change24h: 15.2, holders: 200000, status: 'final', isNew: true },
  { id: '7', name: 'Turbo', symbol: 'TURBO', price: 0.005, marketCap: 500000, volume24h: 20000, change24h: 45.2, holders: 1200, status: 'new', isNew: true },
];

const fetchTokens = async (): Promise<Token[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DB_DATA), 1000);
  });
};

export default function TokenTable() {
  const dispatch = useAppDispatch();
  const { sortColumn, sortDirection } = useAppSelector((state) => state.table);
  const [activeTab, setActiveTab] = useState<'new' | 'final' | 'migrated'>('new');
  const [showNewOnly, setShowNewOnly] = useState(false);
  const { data: initialData, isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: Infinity, 
  });

  const liveData = useMockWebSocket(initialData || []);

  const filteredData = useMemo(() => {
    if (!liveData) return [];

    let filtered = liveData.filter(t => t.status === activeTab);
    
    if (showNewOnly) {
      filtered = filtered.filter(t => t.isNew === true);
    }
    
    return filtered.sort((a, b) => {
      const aValue = a[sortColumn as keyof Token] as number | string;
      const bValue = b[sortColumn as keyof Token] as number | string;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [liveData, activeTab, sortColumn, sortDirection, showNewOnly]);

  if (isLoading) return <TableSkeleton />;

  const SortHeader = ({ label, column, align = 'right' }: { label: string, column: string, align?: string }) => (
    <th 
      className={`py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none text-${align}`}
      onClick={() => dispatch(setSort(column))}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {label}
        <ArrowUpDown size={12} className={sortColumn === column ? "text-indigo-400" : "opacity-30"} />
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-1">
        <div className="flex gap-1">
          {[
            { id: 'new', label: 'New Pairs' },
            { id: 'final', label: 'Final Stretch' },
            { id: 'migrated', label: 'Migrated' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all relative",
                activeTab === tab.id ? "text-indigo-400" : "text-gray-500 hover:text-white"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-indigo-500" />
              )}
            </button>
          ))}
        </div>

        <div className="mb-2 sm:mb-0">
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                showNewOnly 
                  ? "bg-indigo-500/10 border-indigo-500 text-indigo-400" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              )}>
                <Filter size={14} />
                Filters
                {showNewOnly && <span className="flex h-2 w-2 rounded-full bg-indigo-500" />}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-[#1a1a1a] border-white/10 p-3" align="end">
              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm mb-2">View Options</h4>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="new-only" 
                    checked={showNewOnly}
                    onChange={(e) => setShowNewOnly(e.target.checked)}
                    className="accent-indigo-500 h-4 w-4 rounded border-gray-300"
                  />
                  <label 
                    htmlFor="new-only" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                  >
                    Trending Only
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</th>
                <SortHeader label="Price" column="price" />
                <SortHeader label="24h Change" column="change24h" />
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell group cursor-help relative">
                  <div className="flex items-center justify-end gap-1">
                    Volume
                    <Info size={12} className="opacity-50" />
                  </div>
                  <div className="absolute top-full right-0 mt-1 hidden group-hover:block bg-gray-800 text-white text-[10px] p-2 rounded shadow-lg z-10 w-32 text-center">
                    24h Trading Volume
                  </div>
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.length > 0 ? (
                filteredData.map((token, index) => (
                  <TokenRow key={token.id} token={token} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No tokens match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}