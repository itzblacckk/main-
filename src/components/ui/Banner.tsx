import React from 'react';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export function Banner({ title, subtitle, backgroundImage }: BannerProps) {
  return (
    <div 
      className="relative h-[300px] mb-12 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}