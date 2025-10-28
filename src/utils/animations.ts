import { useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';

export const animationConfigs = {
  // Spring animations
  gentle: {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },
  
  // Timing animations
  fast: {
    duration: 200,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  
  normal: {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  
  slow: {
    duration: 400,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
};

// Fade in animation
export function useFadeInAnimation() {
  const opacity = useSharedValue(0);
  
  const startAnimation = () => {
    opacity.value = withTiming(1, animationConfigs.normal);
  };

  return { opacity, startAnimation };
}

// Scale animation
export function useScaleAnimation() {
  const scale = useSharedValue(0.95);
  
  const startAnimation = () => {
    scale.value = withSpring(1, animationConfigs.gentle);
  };

  return { scale, startAnimation };
}

// Slide in animation
export function useSlideInAnimation(direction: 'left' | 'right' | 'up' | 'down' = 'up') {
  const translateX = useSharedValue(direction === 'left' ? -100 : direction === 'right' ? 100 : 0);
  const translateY = useSharedValue(direction === 'up' ? 100 : direction === 'down' ? -100 : 0);
  
  const startAnimation = () => {
    translateX.value = withSpring(0, animationConfigs.gentle);
    translateY.value = withSpring(0, animationConfigs.gentle);
  };

  return { translateX, translateY, startAnimation };
}

// Pulse animation
export function usePulseAnimation() {
  const scale = useSharedValue(1);
  
  const startAnimation = () => {
    scale.value = withTiming(1.05, { duration: 300 }, () => {
      scale.value = withTiming(1, { duration: 300 });
    });
  };

  return { scale, startAnimation };
}
