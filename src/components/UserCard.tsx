
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface UserCardProps {
  username: string;
  onSelect: () => void;
}

const UserCard = ({ username, onSelect }: UserCardProps) => {
  return (
    <div className="animate-scaleIn w-full max-w-md bg-white rounded-2xl p-6 shadow-lg 
                    hover:shadow-xl transition-all duration-300 border border-gray-100
                    backdrop-blur-lg backdrop-filter">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Avatar className="w-16 h-16 ring-4 ring-tiktok-pink/10 group-hover:ring-tiktok-pink/20 transition-all duration-300">
            <div className="w-full h-full bg-gradient-to-br from-tiktok-pink via-tiktok-pink-light to-purple-500 animate-pulse" />
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-tiktok-black">@{username}</h3>
          <p className="text-sm text-tiktok-text-secondary">TikTok Creator</p>
        </div>
        <Button
          onClick={onSelect}
          className="bg-tiktok-pink hover:bg-tiktok-pink-dark text-white font-medium px-6
                     transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
