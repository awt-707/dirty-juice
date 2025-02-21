
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
        "w-full p-5 rounded-2xl border-2 transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        "relative overflow-hidden group",
        selected
          ? "border-tiktok-pink bg-gradient-to-br from-pink-50 to-purple-50"
          : "border-gray-100 bg-white hover:border-tiktok-pink/30"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
          selected ? "bg-coin-yellow" : "bg-coin-light"
        )}>
          <Coins className={cn(
            "w-7 h-7 transition-all duration-300",
            selected ? "text-white" : "text-coin-yellow"
          )} />
          <div className="absolute inset-0 rounded-full bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </div>
        <div className="flex-1 text-left">
          <p className={cn(
            "text-lg font-semibold transition-colors duration-300",
            selected ? "text-tiktok-pink" : "text-tiktok-black"
          )}>
            {coins.toLocaleString()} Coins
          </p>
          <p className="text-sm text-tiktok-text-secondary">${price.toFixed(2)}</p>
        </div>
        {selected && (
          <div className="absolute inset-0 bg-gradient-shine opacity-30 animate-shine" />
        )}
      </div>
    </button>
  );
};

export default CoinPackCard;
