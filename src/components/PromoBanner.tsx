'use client';

import Link from 'next/link';
import { ArrowRight, Tag, Zap } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  discount?: string;
  bgColor?: string;
  textColor?: string;
  icon?: 'tag' | 'zap';
}

export default function PromoBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  discount,
  bgColor = 'bg-gradient-to-r from-orange-500 to-red-500',
  textColor = 'text-white',
  icon = 'tag'
}: PromoBannerProps) {
  const IconComponent = icon === 'tag' ? Tag : Zap;

  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <IconComponent className="h-5 w-5" />
            {discount && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                {discount}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm opacity-90 mb-4">{subtitle}</p>
          <Link
            href={ctaLink}
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <IconComponent className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}