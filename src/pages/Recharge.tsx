
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, LoaderCircle, Sparkles } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    if (selectedPack !== null) {
      setIsProcessing(true);
      const pack = COIN_PACKS[selectedPack];
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Purchase Successful! 🎉",
          description: (
            <div className="flex items-center gap-2">
              <span>{pack.coins.toLocaleString()} coins have been sent to @{username}</span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          ),
          duration: 3000,
        });
        setTimeout(() => navigate('/'), 3000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 animate-scaleIn">
            <LoaderCircle className="w-12 h-12 text-tiktok-pink animate-spin" />
            <p className="text-lg font-medium">Processing payment...</p>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Coin Package</h1>
          <p className="text-gray-500">Sending to @{username}</p>
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
          disabled={selectedPack === null || isProcessing}
          className="w-full bg-tiktok-pink hover:bg-tiktok-pink/90 text-white h-12 text-lg relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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
