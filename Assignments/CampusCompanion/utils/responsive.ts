// utils/responsive.ts
// Helper functions for responsive design
// "Responsive" means the app looks good on phones of different sizes AND tablets
// These functions automatically scale sizes based on screen dimensions

import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get current screen dimensions (width and height)
// This tells us how big the device screen is
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base size values (standard iPhone 12/13/14 dimensions)
// We use these as a reference point - other screen sizes scale relative to these
const baseWidth = 390;
const baseHeight = 844;

// ===== Scale Functions =====
// These functions scale UI elements based on screen size
// So if screen is twice as big, elements become twice as big

// Function: scaleWidth(size)
// Scales a width value based on screen width
// Example: scaleWidth(100) on a phone might be 100px, but on a tablet might be 200px
export const scaleWidth = (size: number): number => {
  return (screenWidth / baseWidth) * size;
};

// Function: scaleHeight(size)
// Scales a height value based on screen height
// Example: margins, padding, etc. scale proportionally
export const scaleHeight = (size: number): number => {
  return (screenHeight / baseHeight) * size;
};

// Function: scaleFont(size)
// Scales font size and rounds it for clarity
// Different handling for iOS and Android to ensure crisp text
export const scaleFont = (size: number): number => {
  // Calculate the scaled font size
  const scale = screenWidth / baseWidth;
  const newSize = size * scale;
  
  // iOS and Android handle text slightly differently, so we adjust
  if (Platform.OS === 'ios') {
    // iOS: Round to nearest pixel
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // Android: Round and subtract 2 (Android renders text slightly larger)
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Function: isTablet()
// Detects if the device is a tablet (large screen) or phone (small screen)
// Tablets have width >= 768 pixels (industry standard)
export const isTablet = (): boolean => {
  return screenWidth >= 768;
};

// Spacing object - provides consistent padding and margins throughout the app
// Use these values so spacing is uniform and responsive
// Example: padding: spacing.md makes padding consistent across all screens
export const spacing = {
  xs: scaleWidth(4),      // Extra small - very tight spacing
  sm: scaleWidth(8),      // Small - tight spacing
  md: scaleWidth(12),     // Medium - normal spacing
  lg: scaleWidth(16),     // Large - spacious
  xl: scaleWidth(20),     // Extra large - very spacious
  xxl: scaleWidth(24),    // Double extra large
  xxxl: scaleWidth(32),   // Triple extra large
};

// Font size object - provides consistent text sizes throughout the app
// Use these values so all text is readable and proportional
// Example: fontSize: fonts.md makes text size consistent
export const fonts = {
  xs: scaleFont(10),      // Extra small - tiny text (captions)
  sm: scaleFont(12),      // Small - small text (labels)
  md: scaleFont(14),      // Medium - body text (default)
  lg: scaleFont(16),      // Large - subheadings
  xl: scaleFont(18),      // Extra large - headings
  xxl: scaleFont(20),     // Double extra large - big headings
  xxxl: scaleFont(24),    // Triple extra large - very big headings
  huge: scaleFont(28),    // Huge - screen titles
  massive: scaleFont(32), // Massive - main titles
};