import React, { useState } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import { colors, shadows } from '../utils/theme';

interface AnimatedCardProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export function AnimatedCard({
  onPress,
  children,
  style,
  elevated = false,
}: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handlePressIn = () => {
    if (!onPress) return;
    scale.value = withSpring(0.98, {
      damping: 10,
      mass: 1,
      stiffness: 120,
    });
    translateY.value = withTiming(2, {
      duration: 150,
      easing: Easing.ease,
    });
    shadowOpacity.value = withTiming(1, {
      duration: 150,
      easing: Easing.ease,
    });
  };

  const handlePressOut = () => {
    if (!onPress) return;
    scale.value = withSpring(1, {
      damping: 10,
      mass: 1,
      stiffness: 120,
    });
    translateY.value = withTiming(0, {
      duration: 150,
      easing: Easing.ease,
    });
    shadowOpacity.value = withTiming(0, {
      duration: 150,
      easing: Easing.ease,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const content = (
    <View
      style={[
        {
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
          borderWidth: 1,
          borderRadius: 12,
          ...shadows.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={animatedStyle}>
          {content}
        </Animated.View>
      </Pressable>
    );
  }

  return <Animated.View style={animatedStyle}>{content}</Animated.View>;
}
