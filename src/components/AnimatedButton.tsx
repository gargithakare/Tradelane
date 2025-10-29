import React, { useState } from 'react';
import { Pressable, Text, View, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, shadows } from '../utils/theme';

interface AnimatedButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function AnimatedButton({
  onPress,
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  labelStyle,
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (disabled) return;
    setIsPressed(true);
    scale.value = withSpring(0.95, {
      damping: 12,
      mass: 1,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    if (disabled) return;
    setIsPressed(false);
    scale.value = withSpring(1, {
      damping: 12,
      mass: 1,
      stiffness: 150,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.6 : opacity.value,
  }));

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  const variantStyles = {
    primary: {
      bg: colors.accent.primary,
      text: '#FFFFFF',
      shadow: shadows.tealglow,
    },
    secondary: {
      bg: colors.bg.secondary,
      text: colors.accent.primary,
      shadow: shadows.sm,
    },
    outline: {
      bg: 'transparent',
      text: colors.accent.primary,
      shadow: null,
    },
  };

  const variant_style = variantStyles[variant];

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className={`${sizeStyles[size]} rounded-lg items-center justify-center`}
        style={{
          backgroundColor: variant === 'outline' ? 'transparent' : variant_style.bg,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: variant === 'outline' ? variant_style.text : 'transparent',
          ...(variant_style.shadow || {}),
        }}
      >
        <Text
          className="font-semibold"
          style={[
            {
              color: variant_style.text,
              fontFamily: 'Poppins',
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
