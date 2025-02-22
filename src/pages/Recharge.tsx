import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, LoaderCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const calculatePrice = (coins: number): number => {
  const referenceRatio = COIN_PACKS.map(pack => pack.price / pack.coins);
  const averageRatio = referenceRatio.reduce((a, b) => a + b) / referenceRatio.length;
  return Number((coins * averageRatio).toFixed(2));
};

const Recharge = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [customCoins, setCustomCoins] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(0);

  const handleCustomCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomCoins(value);
      setSelectedPack(null);
    }
  };

  const handlePurchase = () => {
    const coinsToAdd = customCoins ? parseInt(customCoins) : (selectedPack !== null ? COIN_PACKS[selectedPack].coins : 0);
    if (coinsToAdd > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsPurchaseComplete(true);
        setCurrentCoins(prev => prev + coinsToAdd);
      }, 2000);
    }
  };

  const calculatedPrice = customCoins ? calculatePrice(parseInt(customCoins)) : null;

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

      {/* Custom Coins Input */}
      <div className="px-4 mb-6">
        <div className="space-y-2">
          <label htmlFor="customCoins" className="text-sm font-medium text-gray-700">
            Nombre de pièces souhaité
          </label>
          <Input
            id="customCoins"
            type="text"
            value={customCoins}
            onChange={handleCustomCoinsChange}
            placeholder="Entrez le nombre de pièces"
            className="text-lg"
          />
          {customCoins && (
            <p className="text-[#FE2C55] font-medium text-right">
              Prix estimé : {calculatedPrice} €
            </p>
          )}
        </div>
      </div>

      {/* Coin Packs */}
      <div className="px-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Packs disponibles</h2>
          <p className="text-sm text-gray-500">Ou choisissez un pack prédéfini</p>
        </div>

        <div className="space-y-3">
          {COIN_PACKS.map((pack, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedPack(index);
                setCustomCoins('');
              }}
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
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="w-full max-w-md p-6 flex flex-col items-center">
            <div className="w-16 h-16 relative mb-4">
              <LoaderCircle className="w-full h-full text-[#FE2C55] animate-spin" />
            </div>
            <p className="text-lg font-medium text-gray-900">Traitement en cours...</p>
          </div>
        </div>
      )}

      {/* Purchase Complete Modal */}
      {isPurchaseComplete && (
        <div className="fixed inset-0 bg-white z-50 animate-fadeIn">
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#E8FAF0] rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-[#00DC7D]" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Paiement terminé
            </h2>

            <p className="text-gray-600 text-center mb-12">
              Tu as rechargé 20000 Pièces. Pour profiter d'un accès rapide au rechargement la prochaine fois, ajoute <span className="text-gray-900">tiktok.com/coin</span> à ton écran d'accueil.
            </p>

            <Button 
              className="w-full bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white h-12 rounded-xl mb-4"
              onClick={() => setIsPurchaseComplete(false)}
            >
              En savoir plus
            </Button>

            <button 
              onClick={() => setIsPurchaseComplete(false)} 
              className="text-gray-500 font-medium"
            >
              Pas maintenant
            </button>
          </div>
        </div>
      )}

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button
          onClick={handlePurchase}
          disabled={(!customCoins && selectedPack === null) || isProcessing}
          className="w-full bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white h-12"
        >
          {customCoins || selectedPack !== null ? (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Payer {customCoins ? calculatedPrice : COIN_PACKS[selectedPack!].price.toFixed(2)} €
            </>
          ) : (
            'Sélectionner un montant'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
