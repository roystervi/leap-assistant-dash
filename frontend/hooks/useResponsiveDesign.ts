import { useState, useEffect } from 'react';

export function useResponsiveDesign() {
  const [screenSize, setScreenSize] = useState('desktop');
  const [orientation, setOrientation] = useState('landscape');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      
      // Determine screen size
      if (width >= 1920) setScreenSize('tv');
      else if (width >= 1200) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
      
      // Determine orientation
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);
    
    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  const getBreakpointInfo = () => {
    const breakpoints = {
      tv: { min: 1920, max: Infinity, label: 'TV Display' },
      desktop: { min: 1200, max: 1919, label: 'Desktop Monitor' },
      tablet: { min: 768, max: 1199, label: 'Tablet' },
      mobile: { min: 320, max: 767, label: 'Mobile Phone' }
    };
    
    return breakpoints[screenSize as keyof typeof breakpoints];
  };

  const getLayoutConfig = () => {
    switch (screenSize) {
      case 'tv':
        return {
          sidebarWidth: 'w-80',
          gridCols: 'grid-cols-16',
          typography: 'text-xl',
          spacing: 'gap-6 p-8',
          cardPadding: 'p-6'
        };
      case 'desktop':
        return {
          sidebarWidth: 'w-72',
          gridCols: 'grid-cols-12',
          typography: 'text-lg',
          spacing: 'gap-4 p-6',
          cardPadding: 'p-4'
        };
      case 'tablet':
        return {
          sidebarWidth: 'w-16 hover:w-72',
          gridCols: 'grid-cols-1 lg:grid-cols-2',
          typography: 'text-base',
          spacing: 'gap-4 p-4',
          cardPadding: 'p-4'
        };
      case 'mobile':
        return {
          sidebarWidth: 'w-72',
          gridCols: 'flex flex-col',
          typography: 'text-sm',
          spacing: 'gap-3 p-3',
          cardPadding: 'p-3'
        };
      default:
        return {
          sidebarWidth: 'w-72',
          gridCols: 'grid-cols-12',
          typography: 'text-lg',
          spacing: 'gap-4 p-6',
          cardPadding: 'p-4'
        };
    }
  };

  return {
    screenSize,
    orientation,
    dimensions,
    breakpointInfo: getBreakpointInfo(),
    layoutConfig: getLayoutConfig(),
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isTV: screenSize === 'tv',
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  };
}