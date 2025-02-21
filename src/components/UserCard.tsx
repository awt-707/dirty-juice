
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface UserCardProps {
  username: string;
  onSelect: () => void;
}

const UserCard = ({ username, onSelect }: UserCardProps) => {
  return (
    <div className="animate-scaleIn w-full max-w-md bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <div className="w-full h-full bg-gradient-to-br from-tiktok-pink to-purple-500" />
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">@{username}</h3>
          <p className="text-sm text-gray-500">TikTok Creator</p>
        </div>
        <Button
          onClick={onSelect}
          className="bg-tiktok-pink hover:bg-tiktok-pink/90 text-white"
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
