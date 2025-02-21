
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
  const [currentCoins, setCurrentCoins] = useState(0);

  const handlePurchase = () => {
    if (selectedPack !== null) {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentCoins(prev => prev + COIN_PACKS[selectedPack].coins);
        toast({
          title: "Achat terminé",
          description: "Accéde à la page « Obtenir des Pièces » d'un seul geste du doigt",
          action: (
            <Button variant="outline" size="sm" onClick={() => {}}>
              Ajouter à l'écran d'accueil
            </Button>
          ),
        });
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
          <div className="w-6" /> {/* Spacer for alignment */}
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 animate-scaleIn">
            <LoaderCircle className="w-12 h-12 text-[#FE2C55] animate-spin" />
            <p className="text-lg font-medium">Paiement sécurisé...</p>
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
