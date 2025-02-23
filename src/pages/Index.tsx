
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaypalLogo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const balance = 40000000; // $40M

  const handleSend = () => {
    if (username.trim()) {
      navigate(`/send/${encodeURIComponent(username)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header avec logo PayPal */}
      <header className="bg-[#142C8E] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-2xl flex items-center gap-2">
              <span className="text-[#179BD7]">Pay</span>
              <span className="text-[#253B80]">Pal</span>
            </div>
            <nav className="hidden md:flex gap-6 text-white">
              <button className="hover:underline">Home</button>
              <button className="hover:underline">Send</button>
              <button className="hover:underline">Wallet</button>
              <button className="hover:underline">Activity</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Balance Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl text-gray-600 mb-2">Available balance</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">${balance.toLocaleString('en-US')}</span>
              <span className="text-gray-500">.00 USD</span>
            </div>
          </div>

          {/* Send Money Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Send payment</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  Send money to
                </label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder="Email or @username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleSend}
                className="w-full bg-[#142C8E] hover:bg-[#0E1F66] text-white"
                size="lg"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <button className="p-4 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-[#142C8E] font-semibold mb-2">Send</div>
              <div className="text-sm text-gray-600">Send payment</div>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-[#142C8E] font-semibold mb-2">Request</div>
              <div className="text-sm text-gray-600">Request payment</div>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-[#142C8E] font-semibold mb-2">Contacts</div>
              <div className="text-sm text-gray-600">Manage contacts</div>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-[#142C8E] font-semibold mb-2">More</div>
              <div className="text-sm text-gray-600">See all options</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
