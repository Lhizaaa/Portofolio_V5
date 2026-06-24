import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import useLanguage from '../components/useLanguage';

export default function NotFoundPage() {
  const { t } = useLanguage();
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you would use your router's navigation
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-fg mb-4 animate-bounce">
            404
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-fg mb-4">
            {t('notfound.heading')}
          </h2>
          <p className="text-lg text-muted max-w-md mx-auto leading-relaxed">
            {t('notfound.description')}
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-line text-fg rounded-lg hover:border-accent/50 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} />
            {t('notfound.back')}
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-fg rounded-lg hover:bg-accent-strong transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Home size={20} />
            {t('notfound.home')}
          </button>
        </div>

       

      </div>
    </div>
  );
}