import React from 'react';
import { Store, Leaf, Bug, Shield, Droplets } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StoreHeader = () => {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1A6B2F] via-[#0D3D1A] to-[#0a2d14] py-6 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white blur-3xl" />
        <div className="absolute right-20 top-40 h-48 w-48 rounded-full bg-amber-300 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-green-300 blur-3xl" />
      </div>
      
      <div className="container mx-auto flex flex-col items-center justify-center relative z-10">
        <div className="mb-2 flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
          <span className="text-xs font-medium text-white/90">{t('store.badge')}</span>
        </div>
        
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {t('store.title')} <span className="text-amber-400">{t('store.titleHighlight')}</span>
            </h1>
          </div>
        </div>
        
        <p className="text-sm md:text-base text-white/80 max-w-2xl text-center mb-4">
          {t('store.subtitle')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <Bug className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-medium text-white">{t('store.pesticides')}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-medium text-white">{t('store.fertilizers')}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-medium text-white">{t('store.cropProtection')}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <Droplets className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-medium text-white">{t('store.growthReg')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;