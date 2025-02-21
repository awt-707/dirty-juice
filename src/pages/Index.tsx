
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">TikTok Coin Recharge</h1>
          <p className="text-gray-500">Send coins to your favorite creators</p>
        </div>

        <SearchBar
          value={username}
          onChange={setUsername}
          onSubmit={handleSearch}
          className="mb-6"
        />

        {showUser && username && (
          <UserCard
            username={username}
            onSelect={handleSelectUser}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
