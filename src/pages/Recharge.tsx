
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoinPackCard from '@/components/CoinPackCard';
import { useToast } from '@/components/ui/use-toast';

const COIN_PACKS = [
  { coins: 70, price: 0.99 },
  { coins: 350, price: 4.99 },
  { coins: 700, price: 9.99 },
  { coins: 1400, price: 19.99 },
  { coins: 3500, price: 49.99 },
  { coins: 7000, price: 99.99 },
];

const Recharge = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  const handlePurchase = () => {
    if (selectedPack !== null) {
      const pack = COIN_PACKS[selectedPack];
      toast({
        title: "Purchase Successful! 🎉",
        description: `${pack.coins.toLocaleString()} coins have been sent to @${username}`,
        duration: 3000,
      });
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-tiktok-bg-light py-8 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-tiktok-text-secondary hover:text-tiktok-pink mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="text-center mb-8 space-y-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-tiktok-pink to-purple-500 text-transparent bg-clip-text">
            Select Coin Package
          </h1>
          <p className="text-tiktok-text-secondary">Sending to @{username}</p>
        </div>

        <div className="space-y-4 mb-8">
          {COIN_PACKS.map((pack, index) => (
            <CoinPackCard
              key={index}
              coins={pack.coins}
              price={pack.price}
              selected={selectedPack === index}
              onSelect={() => setSelectedPack(index)}
            />
          ))}
        </div>

        <Button
          onClick={handlePurchase}
          disabled={selectedPack === null}
          className={cn(
            "w-full h-12 text-lg font-medium transition-all duration-300",
            "bg-tiktok-pink hover:bg-tiktok-pink-dark text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transform hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {selectedPack !== null ? (
            <>
              Pay ${COIN_PACKS[selectedPack].price.toFixed(2)}
              <Check className="ml-2 w-5 h-5" />
            </>
          ) : (
            'Select a package'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
