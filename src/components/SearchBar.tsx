
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  className?: string;
}

const SearchBar = ({ value, onChange, onSubmit, className }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-md", className)}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-tiktok-pink transition-colors" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter TikTok username"
          className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 border border-transparent focus:border-tiktok-pink focus:outline-none transition-all"
        />
      </div>
    </form>
  );
};

export default SearchBar;
