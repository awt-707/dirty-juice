import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, LoaderCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const COIN_PACKS = [
  { coins: 130, price: 2.49 },
  { coins: 199, price: 3.49 },
  { coins: 330, price: 5.99 },
  { coins: 400, price: 6.99 },
  { coins: 600, price: 10.99 },
  { coins: 725, price: 12.99 },
  { coins: 1120, price: 19.99 },
];

const Recharge = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(0);

  const handlePurchase = () => {
    if (selectedPack !== null) {
      setIsProcessing(true);
      
      // Simuler le processus de paiement
      setTimeout(() => {
        setIsProcessing(false);
        setIsPurchaseComplete(true);
        setCurrentCoins(prev => prev + COIN_PACKS[selectedPack].coins);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Recharger</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Current Balance */}
      <div className="px-4 py-6 text-center">
        <p className="text-sm text-gray-600 mb-2">Solde en pièces</p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center">
            <span className="text-white text-sm">₮</span>
          </div>
          <span className="text-3xl font-bold">{currentCoins}</span>
        </div>
      </div>

      {/* Coin Packs */}
      <div className="px-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Échange</h2>
          <p className="text-sm text-gray-500">Échanger les revenus des Cadeaux contre des Pièces</p>
          <p className="text-xs text-gray-400">Des revenus des Cadeaux : $2.08 = €2.05(✨ 173)</p>
        </div>

        <div className="space-y-3">
          {COIN_PACKS.map((pack, index) => (
            <button
              key={index}
              onClick={() => setSelectedPack(index)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                selectedPack === index 
                  ? "border-[#FE2C55] bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center">
                  <span className="text-white text-xs">₮</span>
                </div>
                <span className="font-medium">{pack.coins} pièces</span>
              </div>
              <span className="text-[#FE2C55] font-medium">{pack.price.toFixed(2)} €</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[280px] p-8 flex flex-col items-center gap-6 shadow-2xl animate-scaleIn">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FE2C55]/20 blur-xl rounded-full animate-pulse"></div>
              <LoaderCircle className="w-16 h-16 text-[#FE2C55] animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">Paiement sécurisé</p>
              <p className="text-gray-500 text-sm">Veuillez patienter...</p>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Complete Modal */}
      {isPurchaseComplete && (
        <div className="fixed inset-0 bg-[#F2FCE2] z-50 animate-fadeIn">
          <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center relative">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-3 text-center">
              Paiement réussi !
            </h2>
            <p className="text-green-700 text-center mb-8">
              Votre achat a été effectué avec succès
            </p>

            <div className="bg-[#F5F7FA] w-32 h-32 rounded-2xl mb-6 flex items-center justify-center p-6">
              <svg viewBox="0 0 101 32" className="w-full h-auto">
                <path d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.237 7.2 C 10.637 7.2 11.937 7.2 12.637 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z" fill="#253B80"></path>
                <path d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.6 24.037 24.6 C 27.337 24.6 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.137 10.7 C 36.237 10.4 35.837 10 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.9 C 23.037 19.3 22.837 18.4 23.037 17.4 C 23.337 15.3 25.137 13.8 27.237 13.8 C 28.337 13.8 29.137 14.1 29.737 14.7 C 30.237 15.3 30.537 16.2 30.337 17.2 Z" fill="#253B80"></path>
                <path d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 45.537 18.1 L 43.337 10.8 C 43.237 10.3 42.737 10 42.337 10 L 38.637 10 C 38.237 10 37.837 10.4 38.037 10.9 L 42.137 23 L 38.237 28.4 C 37.937 28.8 38.237 29.4 38.737 29.4 L 42.437 29.4 C 42.837 29.4 43.137 29.2 43.337 28.9 L 55.837 10.9 C 56.137 10.6 55.837 10 55.337 10 Z" fill="#253B80"></path>
                <path d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.7 C 55.637 24.1 55.937 24.4 56.337 24.4 L 60.337 24.4 C 60.737 24.4 61.037 24.1 61.137 23.7 L 61.937 18.1 C 62.037 17.6 62.437 17.2 63.037 17.2 L 65.537 17.2 C 70.637 17.2 73.637 14.7 74.437 9.8 C 74.737 7.7 74.437 6 73.437 4.8 C 72.237 3.5 70.237 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.737 7.2 C 66.137 7.2 67.437 7.2 68.137 8 C 68.637 8.4 68.837 9.1 68.637 10.1 Z" fill="#179BD7"></path>
                <path d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.6 79.537 24.6 C 82.837 24.6 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.637 10.7 C 91.737 10.4 91.337 10 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.9 C 78.437 19.3 78.237 18.4 78.437 17.4 C 78.737 15.3 80.537 13.8 82.637 13.8 C 83.737 13.8 84.537 14.1 85.137 14.7 C 85.737 15.3 85.937 16.2 85.737 17.2 Z" fill="#179BD7"></path>
              </svg>
            </div>

            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white h-12 rounded-lg shadow-lg mb-4"
              onClick={() => navigate(-1)}
            >
              Retourner à la boutique
            </Button>

            <button 
              onClick={() => setIsPurchaseComplete(false)} 
              className="text-green-600 font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button
          onClick={handlePurchase}
          disabled={selectedPack === null || isProcessing}
          className="w-full bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white h-12"
        >
          {selectedPack !== null ? (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Payer {COIN_PACKS[selectedPack].price.toFixed(2)} €
            </>
          ) : (
            'Sélectionner un pack'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
