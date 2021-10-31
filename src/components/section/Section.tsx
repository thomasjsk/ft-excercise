import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: any | any[];
}
export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
}: SectionProps) => {
  return (
    <div className="flex flex-col mx-8 p-2">
      <div className="my-4">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
};
