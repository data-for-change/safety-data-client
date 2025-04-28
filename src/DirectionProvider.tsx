// DirectionProvider.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'react-bootstrap';
import { selectDirection } from './stores';
import { setBootstrapCssDirection } from './utils/bootstrapLoader';

interface DirectionProviderProps {
  children: React.ReactNode;
  ltrCssPath?: string;
  rtlCssPath?: string;
}

/**
 * Enhanced provider that wraps ThemeProvider and handles direction CSS
 */
export const DirectionProvider: React.FC<DirectionProviderProps> = ({ 
  children
}) => {
  // Get direction from Redux store
  const direction = useSelector(selectDirection);
  
  // Handle CSS switching
  useEffect(() => {
    setBootstrapCssDirection(direction === 'rtl');
  }, [direction]);
  
  //define ThemeProvider diraction 
  return (
    <ThemeProvider dir={direction}>
      {children}
    </ThemeProvider>
  );
};

export default DirectionProvider;