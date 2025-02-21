
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import UserCard from '@/components/UserCard';

const Index = () => {
  const [username, setUsername] = useState('');
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim()) {
      setShowUser(true);
    }
  };

  const handleSelectUser = () => {
    navigate(`/recharge/${encodeURIComponent(username)}`);
  };

  return (
    <div className="min-h-screen bg-tiktok-bg-light py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-tiktok-pink to-purple-500 text-transparent bg-clip-text">
            TikTok Coin Recharge
          </h1>
          <p className="text-tiktok-text-secondary">Send coins to your favorite creators</p>
        </div>

        <SearchBar
          value={username}
          onChange={setUsername}
          onSubmit={handleSearch}
          className="mb-8"
        />

        {showUser && username && (
          <div className="animate-slideUp">
            <UserCard
              username={username}
              onSelect={handleSelectUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
