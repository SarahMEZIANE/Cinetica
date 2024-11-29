import React from 'react';

interface SectionHeaderProps {
  title: string;
  viewAllPath?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between px-4 mb-2">
      <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
    </div>
  );
};