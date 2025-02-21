
import React from 'react';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoinPackCardProps {
  coins: number;
  price: number;
  selected?: boolean;
  onSelect: () => void;
}

const CoinPackCard = ({ coins, price, selected, onSelect }: CoinPackCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? "border-tiktok-pink bg-gradient-to-br from-pink-50 to-purple-50"
          : "border-gray-200 bg-white hover:border-tiktok-pink/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-coin-light">
          <Coins className="w-6 h-6 text-coin-gold" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-lg font-semibold">{coins.toLocaleString()} Coins</p>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
    </button>
  );
};

export default CoinPackCard;
