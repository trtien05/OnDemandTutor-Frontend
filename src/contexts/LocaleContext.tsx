import React, { createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface LocaleContextType {
  locale: string;
  changeLocale: (lng: string) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  const changeLocale = (lng: string) => {
    i18n.changeLanguage(lng);
    setLocale(lng);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};