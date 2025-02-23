
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Send = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!amount) return;

    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "Payment sent!",
        description: `Successfully sent $${amount} to ${username}`,
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="bg-[#142C8E] text-white">
        <div className="container mx-auto px-4 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Send payment</h1>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sending to
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">@{username}</span>
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Add a note (optional)
                </label>
                <Input
                  id="note"
                  placeholder="Write a message..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={!amount || isProcessing}
                className="w-full bg-[#142C8E] hover:bg-[#0E1F66] text-white"
                size="lg"
              >
                {isProcessing ? "Processing..." : `Send $${amount || '0'}`}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Send;
